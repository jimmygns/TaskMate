var logIn = angular.module("logIn", []);

logIn.controller("loginCtrl", ["$scope", function loginCtrl($scope){

    $scope.submit = function(){

        Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

    Parse.User.logIn($scope.email, $scope.password, {
      success: function(user) {
      // Do stuff after successful login.
      window.location.replace("../newsfeed.html");
      },
      error: function(user, error) {
    // The login failed. Check error to see why.
      }
  });  


  }
}]);





