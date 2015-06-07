//create a new user
var signUpApp = angular.module("signUpApp", []);

signUpApp.controller("signUpCtrl", ["$scope", function signUpCtrl($scope){
    Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

    $scope.submit1 = function(){

        Parse.Cloud.run('signup', {email: $scope.newemail, password: $scope.newpassword, firstName: $scope.firstName, lastName: $scope.lastName}, {
            success: function(result) {
                window.location.replace("../index.html");
            },
            error: function(error) {
                alert(error);
            }
        });
	}
}]);
	