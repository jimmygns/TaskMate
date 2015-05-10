
function NewsfeedController($scope){
	
	Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
	var Newsfeed = Parse.Object.extend("Newsfeed");
	var query = new Parse.Query(Newsfeed);
	var id = "YqBoUQyWYs";
    query.equalTo("objectId",id);
    var postsToDisplay = [];

	query.find({
		success: function(results) {
    for (var i = 0; i < results.length; i++) {
    	var object = results[i];
    	postsToDisplay.push(object.get('message'));
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

    

	
}