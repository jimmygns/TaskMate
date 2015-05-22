

var NewsfeedController =function ($scope){
	
	Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
	var Newsfeed = Parse.Object.extend("Newsfeed");
	var query = new Parse.Query(Newsfeed);
    //var address=location.search;
    //var id=address.substring(1,address.length);
	var id = "OS9PJA9yxX";
	var owner="";
	

	query.get(id, {
		success: function(result) {
    // The object was retrieved successfully.
    
    
    var messageStr = result.get('message');
    var likes = result.get('numLikes');
    var arrayOfUsers = result.get('liked');
    var flag=true;


    owner=result.get('owner');
    //alert(likes);

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



    //retrieving the user object
    var User = Parse.Object.extend("User");
    var query1 = new Parse.Query(User);

    query1.get(owner, {
    	success: function(result) {
    		var name=result.get('username');
    		var image=result.get('profilePic');
    		if (image == undefined)
    		{
    			var picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png'
    		}
    		else
    		{
    			var picURL = pic.url();
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
    	$scope.Comments.push({content: object.get('content'), 
    		username: "", 
    		commenterProfilePage: "",
    		commenterProfilePicture: "", 
    	});
    	var commenterId=object.get('user');

    	var User = Parse.Object.extend('User');
    	var query3 = new Parse.Query(User);
    	query3.get(commenterId, {
    		success: function(result) {
    			var name=result.get('username');
    			var image=result.get('profilePic');
    			if (image == undefined)
    			{
    				var picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png'
    			}
    			else
    			{
    				var picURL = pic.url();
    			}
    			$scope.Comments[index].username=name;
    			$scope.Comments[index].commenterProfilePicture=picURL;
    			$scope.Comments[index].commenterProfilePage="../profile.html?" + commenterId;
    			index++;
    			$scope.$digest();

    		},
    		error: function(error) {
    			alert("alert");
    			alert("Error: " + error.code + " " + error.message);
    		}


    	});
    	



    	//var commenter=object.get('commenter');
    	/*
    	commenter.fetch({
    		success: function(commenter) {
    			alert("success");
    			var name = commenter.get("username");
    			$scope.Comments.push({username: name, content: object.get('content')});
    		}
    	});
*/

}

$scope.$digest();
},
error: function(error) {
	alert("alert");
	alert("Error: " + error.code + " " + error.message);
}


});





},
error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
    alert("alert");
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
				//Parse.User.current().id
				result.add('liked',"8EWpEXknMZ");
				$scope.Like="Unlike"+result.get('numLikes');
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
	
	//var current_Id=Parse.User.current().id;
	//user.id="8EWpEXknMZ";
	
	comment.set('owner',id);
	comment.set('user',"8EWpEXknMZ");
	var input=document.getElementById("commentInput").value;
	comment.set('content',input);
	comment.save();

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
    location.reload();
},
error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
}
});

    




	

}

}


