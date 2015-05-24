Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

var User = Parse.Object.extend("User");

function NavigationBarController($scope) {
	$scope.numberOfNotification = 7;

	$scope.profilePictureURL = "img/glyphicons-4-user.png";

	/*picture = Parse.User.current().get("profilePicture");
	if (picture != undefined) {
		$scope.profilePictureURL = picture.url();
	}*/

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