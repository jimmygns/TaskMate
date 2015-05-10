
function NewsfeedController($scope){
	
	Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
	var Newsfeed = Parse.Object.extend("Newsfeed");
	var query = new Parse.Query(Newsfeed);
	var id = "YqBoUQyWYs";
    query.equalTo("objectId",id);
	query.find({
		success: function(results) {
			alert("Successfully retrieved " + results.length + " lists.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
    	var object = results[i];
    	//var json='{"id":' + object.id +',' + '"name":' +object.get('Name') + '}';
    	//array.push(json);
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

    

	
}