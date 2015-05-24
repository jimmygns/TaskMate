

var NewsfeedController =function ($scope){
	
	Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
	var Newsfeed = Parse.Object.extend("Newsfeed");
	var query = new Parse.Query(Newsfeed);
    //var address=location.search;
    //var id=address.substring(1,address.length);
	var id = "WTnORQ1jaV";
	var owner;
	query.include("owner");

	query.get(id, {
		success: function(result) {
    // The object was retrieved successfully.
        
    var messageStr = result.get('message');
    var likes = result.get('numLikes');
    var arrayOfUsers = result.get('liked');
    var flag=true;

    owner=result.get('owner').id;
    

    $scope.message = messageStr;
    if(arrayOfUsers!=null){
    	for(var i=0; i<arrayOfUsers.length; i++){
    	//var current_Id = Parse.User.current().id;
    	if(arrayOfUsers[i]=='8EWpEXknMZ'){
    		flag=false;
    		$scope.Like = "Unlike"+likes;
    		break;
    	}
    }    
}
if(flag){
	$scope.Like = "Like"+likes;
}
$scope.$digest();



    //retrieving the user object, owner of the post
    var User = Parse.Object.extend("User");
    var query1 = new Parse.Query(User);

    query1.get(owner, {
    	success: function(result) {
    		var name=result.get('username');
    		var image=result.get('profilePicture');
            
    		if (image == undefined)
    		{
                
    			var picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png'
    		}
    		else
    		{
                
    			var picURL = image.url();
    		}
    		$scope.username = name;
    		$scope.profilePicture=picURL;
    		$scope.profilePage="../profile.html?" + owner;
    		$scope.$digest();

    	},
    	error: function(error) {
    		alert("alert");
    		alert("Error: " + error.code + " " + error.message);
    	}


    });

	//displaying comment to-do
	
	
	var Comment = Parse.Object.extend("Comment");
	var query2 = new Parse.Query(Comment);
	query2.equalTo('owner',id);
    query2.include('userPointer');
	$scope.Comments=[];
	var index=0;
	//var array1=[];
	//var array2=[];

	query2.find({
		success: function(results) {
			//alert("Successfully retrieved " + results.length + " lists.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
    	var object = results[i];
        var person = object.get("userPointer");
        var profilePage="../profile.html?" + person.id;
        var image=person.get('profilePicture');
        if (image == undefined)
        {
            var picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png'
        }
        else
        {
            var picURL = image.url();
        }
        $scope.Comments.push({content: object.get('content'), 
          username: person.get('username'), 
          commenterProfilePage: profilePage,
          commenterProfilePicture: picURL, 
      });


        $scope.$digest();
        /*
    	var commenterId=object.get('user');

    	var User = Parse.Object.extend('User');
    	var query3 = new Parse.Query(User);
        var successful = new Parse.Promise();

    	query3.get(commenterId,{
            success: function(result) {
    			var name=result.get('username');
    			var image=result.get('profilePicture');
    			if (image == undefined)
    			{
    				var picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png'
    			}
    			else
    			{
    				var picURL = image.url();
    			}
    			$scope.Comments[index].username=name;
    			$scope.Comments[index].commenterProfilePicture=picURL;
    			$scope.Comments[index].commenterProfilePage="../profile.html?" + commenterId;
    			index++;
                successful.resolve("The good result.");
    			$scope.$digest();

    		},
    		error: function(error) {
    			alert("commennt user alert");
    			alert("Error: " + error.code + " " + error.message);
    		}


    	});
        $scope.$digest();
*/

    }


},
error: function(error) {
	alert("comments alert");
	alert("Error: " + error.code + " " + error.message);
}


});





},
error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
    alert("owner alert");
    alert("Error: " + error.code + " " + error.message);
}
});


$scope.like = function(){
	
	var status=document.getElementById('likeThePost').innerText;
	query.get(id, {
		success: function(result) {
			var temp=result.get('numLikes');
			var arrayOfUsers=result.get('liked');

			if(status.charAt(0)=="L"){
				
				result.set('numLikes',temp+1);
				//TODO: Parse.User.current().id
				result.add('liked',"8EWpEXknMZ");
				$scope.Like="Unlike"+result.get('numLikes');

                //creating a notification when pressing like button
                var Notification = Parse.Object.extend("Notification");
                var notif = new Notification();

                var User = Parse.Object.extend("User");
                var user_query = new Parse.Query(User);
                //TODO: Parse.User.current().id
                user_query.get("8EWpEXknMZ", {
                    success: function(result) {
                    // The object was retrieved successfully.
                    notif.set("owner",owner);
                    notif.set("outgoing",id);
                    notif.set("user", result);                   
                    notif.set("type","like");
                    var notif_content=result.get('fullName')+" liked your post.";
                    notif.set("content",notif_content);
                    notif.save();
                },
                    error: function(object, error) {
                    }
                });

				result.save();
			}
			else{
				result.set('numLikes',temp-1);
				var index=0;
				for(var i=0; i<arrayOfUsers.length; i++){
					//Parse.User.current().id
					if(arrayOfUsers[i]=="8EWpEXknMZ"){
						index=i;
						break;
					}
				}
				arrayOfUsers.splice(index,1);
				result.set('liked',arrayOfUsers);
				$scope.Like="Like"+result.get('numLikes');
				result.save();
			}
			$scope.$digest();
		},
		error: function(error) {
			alert("alert");
			alert("Error: " + error.code + " " + error.message);
		}


	});


}

$scope.addComment=function(){

	var Comment=Parse.Object.extend("Comment");
	var comment=new Comment();
    var User = Parse.Object.extend("User");
    var user = new User();
    user.id = "8EWpEXknMZ";
	
	//var current_Id=Parse.User.current().id;
	//user.id="8EWpEXknMZ";
	
	comment.set('owner',id);
	comment.set('user',"8EWpEXknMZ");
    
    comment.set('userPointer',user);
    //alert("comment");
	var input=document.getElementById("commentInput").value;
	comment.set('content',input);
	comment.save();


    //creating a notification when pressing like button
    var Notification = Parse.Object.extend("Notification");
    var notif = new Notification();

    var User = Parse.Object.extend("User");
    var user_query = new Parse.Query(User);
    //TODO: Parse.User.current().id
    user_query.get("8EWpEXknMZ", {
        success: function(result) {
        // The object was retrieved successfully.
        notif.set("owner",owner);
        notif.set("outgoing",id);
        notif.set("user", result);                   
        notif.set("type","comment");
        var notif_content=result.get('fullName')+" commented on your post.";
        notif.set("content",notif_content);
        notif.save();
        location.reload();
    },
    error: function(object, error) {
    }
});
    /*
    //Notification object initialized 
    var Notification = Parse.Object.extend("Notification");
    var notification = new Notification();

    var User = Parse.Object.extend("User");
    var query4 = new Parse.Query(User);
    query4.get(current_Id, {
      success: function(result) {
    // The object was retrieved successfully.
    notification.set("owner",owner);
    notification.set("outgoing",id);
    notification.set("user",current_Id);
    notification.set("type","comment");
    var notifiContent=result.get('username')+" commented on your post.";
    notification.set("content",notifiContent);
    notification.save();

    
},
error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
}
});
*/
    




	

}

}


