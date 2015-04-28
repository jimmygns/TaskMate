

Parse.initialize("QjXPXme3VpSyKdvZKMDRXY5TmdOP7L6fxvysfdXq",
 "FB03u9unUQsaHY6PDpt1rxVIlzBfIPkubtssIKSz");


//create a new user
var user = new Parse.User();
user.set("username", "test_email@example.com");
user.set("password", "test_pass");
user.set("email", "test_email@example.com");
  
// other fields can be set just like with Parse.Object
user.set("firstName", "test_firstName");
user.set("lastName", "test_lastName");
  
user.signUp(null, {
  success: function(user) {
    // Hooray! Let them use the app now.
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});  






var logIn = angular.module("logIn", []);

logIn.controller("loginCtrl", [function loginCtrl($scope){
  $scope.submit = function(){
    $scope.email = $scope.email;
    $scope.password = $scope.password;


    Parse.User.logIn($scope.email, $scope.password, {
  success: function(user) {
    // Do stuff after successful login.
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
  }
});  


  }
}])


/*
//for user to log in
Parse.User.logIn($scope.email, $scope.password, {
  success: function(user) {
    // Do stuff after successful login.
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
  }
});   */





