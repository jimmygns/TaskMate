
Parse.initialize("QjXPXme3VpSyKdvZKMDRXY5TmdOP7L6fxvysfdXq",
 "FB03u9unUQsaHY6PDpt1rxVIlzBfIPkubtssIKSz");

//create a new user
var signUpApp = angular.module("signUpApp", []);

signUpApp.controller("signUpCtrl", ["$scope", function signUpCtrl($scope){
	$scope.submit1 = function(){

	var user = new Parse.User();
	user.set("username", $scope.newemail);
	user.set("password", $scope.newpassword);
	user.set("email", $scope.newemail);
  
	// other fields can be set just like with Parse.Object
	user.set("firstName", $scope.firstName);
	user.set("lastName", $scope.lastName);
  
	user.signUp(null, {
  		success: function(user) {
    	// Hooray! Let them use the app now.
    	window.location.replace("../index.html");
  		},
  		error: function(user, error) {
    	// Show the error message somewhere and let the user try again.
    	alert("Error: " + error.code + " " + error.message);
  		}
	});  	

	}
}]);
	