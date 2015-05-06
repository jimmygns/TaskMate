
function ListController($scope){
	
	Parse.initialize("ZLDPnL5t8AzKUzPF2OJfLcP7GGS5584iJSMGXkRS", "3VWB7w2Gri9KbRTmzKp8Lr6hInyAYaiSVjig87uB");
	var List = Parse.Object.extend("List");
	var query = new Parse.Query(List);
	var array = [];

	query.find({
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

    

	
}
/*
(function(){

	var gem =[
      
    {name: 'Zeus', price: 2.99},
    {name: 'ruby',price:3.00}
    ];
	Parse.initialize("ZLDPnL5t8AzKUzPF2OJfLcP7GGS5584iJSMGXkRS", "3VWB7w2Gri9KbRTmzKp8Lr6hInyAYaiSVjig87uB");
	var List = Parse.Object.extend("List");
	var query = new Parse.Query(List);
	var array = [];

	query.find({
		success: function(results) {
			alert("Successfully retrieved " + results.length + " lists.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
    	var object = results[i];
    	var json='{"id":' + object.id +',' + '"name":' +object.get('Name') + '}';
    	array.push(json);
    	alert(object.id + ' - ' + object.get('Name'));
    }
},
error: function(error) {
	alert("alert");
	alert("Error: " + error.code + " " + error.message);
}


});




	
	var app=angular.module("List",[]);
	app.controller('ListController',function(){
		this.products=gem;

	});


})();

*/
