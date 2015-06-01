

var NewsfeedController =function ($scope){
	
	Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
	var Newsfeed = Parse.Object.extend("Newsfeed");
	var query = new Parse.Query(Newsfeed);
    var address=location.search;
    var id=address.substring(1,address.length);
    var current_Id = Parse.User.current().id;
	//var id = "WTnORQ1jaV";
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
    	if(arrayOfUsers[i]==current_Id){
    		flag=false;
    		$scope.Like = likes+" Unlike";
    		break;
    	}
    }    
}
if(flag){
	$scope.Like = likes+" Like";
}
$scope.$digest();




    //retrieving the user object, owner of the post
    var User = Parse.Object.extend("User");
    var query1 = new Parse.Query(User);

    query1.get(owner, {
    	success: function(result) {
    		var name=result.get('firstName')+" "+result.get('lastName');
    		var image=result.get('profilePicture');
            
    		if (image == undefined)
    		{
                
    			var picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png';
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
        var fullName=person.get('firstName')+" "+person.get('lastName');
        $scope.Comments.push({content: object.get('content'), 
          username: fullName, 
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

			if(status.match("Unlike")==null){
				
				result.set('numLikes',temp+1);
				//TODO: Parse.User.current().id
				result.add('liked',current_Id);
				$scope.Like=result.get('numLikes')+" Unlike";

                //creating a notification when pressing like button
                var Notification = Parse.Object.extend("Notification");
                var notif = new Notification();

                var User = Parse.Object.extend("User");
                var user_query = new Parse.Query(User);
                //TODO: Parse.User.current().id
                user_query.get(current_Id, {
                    success: function(result) {
                    // The object was retrieved successfully.
                    notif.set("owner",owner);
                    notif.set("outgoing",id);
                    notif.set("user", result);                   
                    notif.set("type","like");
                    var notif_content=result.get('firstName')+" "+result.get('lastName')+" liked your post.";
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
					
					if(arrayOfUsers[i]==Parse.User.current().id){
						index=i;
						break;
					}
				}
				arrayOfUsers.splice(index,1);
				result.set('liked',arrayOfUsers);
				$scope.Like=result.get('numLikes')+" Like";
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
    user.id = current_Id;
    //alert(id);

    
    query.get(id, {
        success: function(result) {
            result.set('numComments',result.get('numComments')+1);
            result.save();
        },
        error: function(error) {
            alert("alert");
            alert("Error: " + error.code + " " + error.message);
        }
    });


	//var current_Id=Parse.User.current().id;
	//user.id="8EWpEXknMZ";
	
	comment.set('owner',id);
	comment.set('user',current_Id);
    
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
    user_query.get(current_Id, {
        success: function(result) {
        // The object was retrieved successfully.
        notif.set("owner",owner);
        notif.set("outgoing",id);
        notif.set("user", result);                   
        notif.set("type","comment");
        var notif_content=result.get('firstName')+" "+result.get('lastName')+" commented on your post.";
        notif.set("content",notif_content);
        notif.save();
        location.reload();
    },
    error: function(object, error) {
    }
});
    
}

    $scope.profilePictureURL = "img/glyphicons-4-user.png";

    /*picture = Parse.User.current().get("profilePicture");
    if (picture != undefined) {
        $scope.profilePictureURL = picture.url();
    }*/

    $scope.numberOfNotification = Parse.User.current().get('numNotif');

    $scope.profilePictureURL = "img/glyphicons-4-user.png";

    picture = Parse.User.current().get("profilePicture");
    if (picture != undefined) {
        $scope.profilePictureURL = picture.url();
    }

    $scope.goHome = function() {
        window.location.href = "./newsfeed.html";
    }

    $scope.goNotification = function() {
        window.location.href = "./notifications.html";
    }

    $scope.search = function(){
        window.location.href = "./search.html?" + $scope.searchInput;
    };

    $scope.goProfile = function(){
        window.location.href = "./profile.html?" + Parse.User.current().id;
    };

    $scope.logOut = function(){
        Parse.User.logOut();
        window.location.href = "./index.html";
    };

}


