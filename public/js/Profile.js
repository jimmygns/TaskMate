function NavigationBarController($scope) {
    $scope.numberOfNotification = Parse.User.current().get('numNotif');

    $scope.profilePictureURL = "img/glyphicons-4-user.png";

    picture = Parse.User.current().get("profilePicture");
    if (picture != undefined) {
        $scope.profilePictureURL = picture.url();
    }

    $scope.goHome = function() {
        window.location.href = "./newsfeed.html";
    }

    $scope.goNotification = function() {
        window.location.href = "./notifications.html";
    }

    $scope.search = function(){
        window.location.href = "./search.html?" + $scope.searchInput;
    };

    $scope.goProfile = function(){
        window.location.href = "./profile.html?" + Parse.User.current().id;
    };

    $scope.logOut = function(){
        Parse.User.logOut();
        window.location.href = "./index.html";
    };


}

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

    //set the default text for follow button
    var followingArray = currentUser.get("following");
    if($.inArray(ID, followingArray) === -1)
        $scope.followText = "Follow";
    else
        $scope.followText = "Unfollow";




    var picture = currentUser.get('profilePicture');
    if (picture != null)
    {
        $scope.picUrl = picture.url();
    }
    else
    {
        $scope.picUrl = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png';
    }
    $scope.firstName1 = currentUser.get("firstName");
    $scope.lastName1 = currentUser.get('lastName');

    if(ID === currentUser.id)
        document.getElementById("follow").style.visibility = "hidden";
    else {
        document.getElementById("createNewListButton").style.visibility = "hidden";
        document.getElementById("profilePhotoFileUpload").style.display = "none";
        document.getElementById("submitPic").style.display = "none";
    }


    query.find({
        success: function(results) {
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var List = Parse.Object.extend("List");

                var pic = object.get('profilePicture');
                if (pic == undefined)
                {
                    picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png';
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

                            $scope.toDoLists.push({name: listNameCur, link: "/listPage.html?" + object.id});
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

        Parse.Cloud.run('makeList', {name: name, userId: currentUser.id, description: description}, {
            success: function(result) {
                 window.location.href = "../listPage.html?" + result[0];
            },
            error: function(error) {
                alert("Error of " + error.code + error.message);
            }
        });
    };

    $scope.goToList = function() {
        window.location.href = "../listPage.html?" + list.id;
    };

    $scope.follow = function() {


        if(document.getElementById("follow").innerText === "Unfollow")
        {
            $scope.unfollow();
            return;
        }
            
        currentUser.addUnique("following", ID);
        currentUser.save(null, {
            success: function(object) {
                alert("Now following this user!");
            },
            error: function(object, error) {
                alert('Failed to follow, with error code: ' + error.message);
            }
        });
        if(document.getElementById("follow").innerText === "Follow")
           document.getElementById("follow").innerText = "Unfollow";

    };

    $scope.unfollow = function() {
        currentUser.remove("following", ID);
        currentUser.save(null, {
            success: function(object) {
                alert("No longer following this user!");
            },
            error: function(object, error) {
                alert('Failed to follow, with error code: ' + error.message);
            }
        });
        document.getElementById("follow").innerText = "Follow";
    };




    







});




