

Parse.initialize("QjXPXme3VpSyKdvZKMDRXY5TmdOP7L6fxvysfdXq",
 "FB03u9unUQsaHY6PDpt1rxVIlzBfIPkubtssIKSz");



var logIn = angular.module("logIn", []);

logIn.controller("loginCtrl", ["$scope", function loginCtrl($scope){
  $scope.submit = function(){

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





