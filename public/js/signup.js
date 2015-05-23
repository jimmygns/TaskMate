//create a new user
var signUpApp = angular.module("signUpApp", []);

signUpApp.controller("signUpCtrl", ["$scope", function signUpCtrl($scope){
    Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

    $scope.submit1 = function(){

	var user = new Parse.User();
	user.set("username", $scope.newemail);
	user.set("password", $scope.newpassword);
	user.set("email", $scope.newemail);
  
	// other fields can be set just like with Parse.Object
	user.set("firstName", $scope.firstName);
	user.set("lastName", $scope.lastName);

        var fullNameStr = ($scope.firstName + " " + $scope.lastName);
        fullNameStr = fullNameStr.toLowerCase();

        user.set("fullName", fullNameStr);

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
	