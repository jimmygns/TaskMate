function ListController($scope){
	
	Parse.initialize("bh9Iza9Ir2cWNXStutapOSqVT1YCG86nsFBlL5d7", "0Kmq6ErvBxzF6NtYOCobQD7F3qFuC5V2E1NnR2Dl");
	var List = Parse.Object.extend("List");
	var query = new Parse.Query(List);

	query.find({
		success: function(results) {
			alert("Successfully retrieved " + results.length + " lists.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
    	var object = results[i];
    	alert(object.id + ' - ' + object.get('Name'));
    }
},
error: function(error) {
	alert("Error: " + error.code + " " + error.message);
}
});

	$scope.toDoLists=query;
}


