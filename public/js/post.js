
function NewsfeedController($scope){
	
	Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
	var Newsfeed = Parse.Object.extend("Newsfeed");
	var query = new Parse.Query(Newsfeed);
	var id = "QHfBPd4FpQ";
    query.equalTo("objectId",id);
    var postsToDisplay = [];
    var owner="";

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
	var id = "YqBoUQyWYs";
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
