/**
 * Created by yuezhao on 4/24/15.
 */
var profile_app = angular.module("profileApp", []);
profile_app.controller('profileCtrl', function($scope, $http) {
    Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
    var email = prompt("Enter the email: ");

    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.equalTo("email", email);
    var firstName;
    var lastName;


    query.find({
        success: function(results) {
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var List = Parse.Object.extend("List");

                $scope.firstName = object.get('firstName');
                $scope.lastName = object.get('lastName');

                $scope.$digest();

                query = new Parse.Query(List);
                query.equalTo("owner", object.id );

                query.find({
                    success: function(results) {
                        // Do something with the returned Parse.Object values
                        $scope.toDoLists = [];
                        for (var i = 0; i < results.length; i++) {
                            var object = results[i];
                            var listNameCur = object.get('name');

                            $scope.toDoLists.push({name: listNameCur});
                        }
                        $scope.$digest();
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
});