

var NewsfeedController =function ($scope){
	
	Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
	var Newsfeed = Parse.Object.extend("Newsfeed");
	var query = new Parse.Query(Newsfeed);
	var id = "OS9PJA9yxX";
	var owner="";
	

	query.get(id, {
		success: function(result) {
    // The object was retrieved successfully.
    
    
    var messageStr = result.get('message');
    var likes = result.get('numLikes');
    owner=result.get('owner');
    //alert(likes);
    $scope.message = messageStr;
    $scope.Like = "Like"+likes;
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
	/*

	var Comment = Parse.Object.extend("Comment");
	var query2 = new Parse.Query(Comment);
	query2.equalTo('owner',id);

	query2.find({
		success: function(results) {
			//alert("Successfully retrieved " + results.length + " lists.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
    	var object = results[i];
    	var json='{"id":' + object.id +',' + '"name":' +object.get('Name') + '}';
    	array.push(json);
    	//alert(object.id + ' - ' + object.get('Name'));
    }
    $scope.toDoLists=[];
    for(var i = 0; i < array.length;i++){
		$scope.toDoLists.push({name: array[i]});
    }
	$scope.$digest();
},
error: function(error) {
	alert("alert");
	alert("Error: " + error.code + " " + error.message);
}


});
*/




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

			if(status.charAt(0)=="L"){
				
				result.set('numLikes',temp+1);
				$scope.Like="Unlike"+result.get('numLikes');
				result.save();
			}
			else{
				result.set('numLikes',temp-1);
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

	var User=Parse.Object.extend("User");
	var comment=new Comment();
	var user=new User();
	var relation = comment.relation("commenter");
	//user.id=Parse.User.current().id;
	user.id="8EWpEXknMZ";
	
	comment.set('owner',id);
	relation.add(user);
	comment.set('user',"8EWpEXknMZ");
	var input=document.getElementById("commentInput").value;
	comment.set('content',input);
	comment.save();
	location.reload();

}




/*


	query.find({
		success: function(results) {

    for (var i = 0; i < results.length; i++) {
    	var object = results[i];
    	postsToDisplay.push(object.get('message'));
    	owner=object.get('owner');
    	
    }

    $scope.posts = [];
    for(var i=0; i<postsToDisplay.length; i++){
    	$scope.posts.push({message: postsToDisplay[i]});
    }
    $scope.$digest();
},
error: function(error) {
	alert("alert");
	alert("Error: " + error.code + " " + error.message);
}
});
*/	
	
/*
    var user = Parse.Object.extend("User");
	var query1 = new Parse.Query(User);
	query1.equalTo("objectId",owner);

	query1.find({
		success: function(results) {
    for (var i = 0; i < results.length; i++) {
    	var object = results[i];
    	postsToDisplay.push(object.get('message'));
    	owner=object.get('owner');
    	 $scope.path = "src";
    }

   
    $scope.$digest();
},
error: function(error) {
	alert("alert");
	alert("Error: " + error.code + " " + error.message);
}


});
*/
	
}


function like(button_id){
	var id = "OS9PJA9yxX";
	var Newsfeed = Parse.Object.extend("Newsfeed");
	var query = new Parse.Query(Newsfeed);
    query.equalTo("objectId",id);

    var el = document.getElementById(button_id);

	query.find({
		success: function(results) {
    for (var i = 0; i < results.length; i++) {
    	var object = results[i];
    	var numOfLikes = object.get('numLikes');
    	//change the button text
		if(el.innerText == "Like"){
			el.innerText = "Liked";
			numOfLikes = numOfLikes + 1;
			object.set("numLikes", numOfLikes);
			object.save();
		}
		else{
			el.innerText = "Like";
			numOfLikes = numOfLikes - 1;
			object.set("numLikes", numOfLikes);
			object.save();
		}
    }

},
error: function(error) {
	alert("alert");
	alert("Error: " + error.code + " " + error.message);
}


});

}
