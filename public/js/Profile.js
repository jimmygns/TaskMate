var profile_app = angular.module("profileApp", []);
profile_app.controller('profileCtrl', function($scope, $http) {
    Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

    var fullString = location.search;
    var ID = fullString.slice(1);

    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.equalTo("objectId",ID);
    var firstName;
    var lastName;
    var picURL;
    var currentUser = Parse.User.current();

    

    query.find({
        success: function(results) {
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var List = Parse.Object.extend("List");

                var pic = object.get('profilePicture');
                if (pic == undefined)
                {
                    picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png'
                }
                else
                {
                    picURL = pic.url();
                }
                $scope.picURL = picURL;
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

    $scope.upload = function(){

        var fileUploadControl = document.getElementById("profilePhotoFileUpload");

        if (fileUploadControl.files.length > 0) {
            var file = fileUploadControl.files[0];
            var name = "profilePic.jpg";

            var parseFile = new Parse.File(name, file);


            parseFile.save().then(function() {
                // The file has been saved to Parse.

                //associate the profile photo with the user, need to get the current user
                //var User = Parse.Object.extend("User");
                //var pic1 = new Pic();
                currentUser.set("profilePicture", parseFile);
                currentUser.save();

                alert("The picture has been successfully uploaded.");

                $scope.picURL = parseFile.url();
                $scope.$digest();


            }, function(error) {
                // The file either could not be read, or could not be saved to Parse.
                alert("The picture cannot be uploaded, please try again.");
            });
        }
    };

    $scope.makeList = function() {
        var name = document.getElementById('listName').value;
        var description = document.getElementById('listDescription').value

        var List = Parse.Object.extend("List");
        var list = new List;
        list.set("owner", currentUser.id);
        list.set("name", name);
        list.set("description", description);
        list.save(null, {
            success: function(list) {
                window.location.href = "../listPage.html?" + list.id;

            },
            error: function(list, error) {
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    };

    $scope.goToList = function() {
        window.location.href = "../listPage.html?" + list.id;
    };
});