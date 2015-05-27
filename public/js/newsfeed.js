Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63",
    "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

function goHome() {
    window.location.href = "../newsfeed.html";
}

function redirect(){
	var text = document.getElementById("searchInput").value;
	window.location.href = "../search.html?" + text;
};

function goToProfile(){
	var text = Parse.User.current().id;
	window.location.href = "../profile.html?" + text;
};

function logOut(){
	Parse.User.logOut(); 
  window.location.href = "../index.html";
};

function goToAboutUs(){
  window.location.href = "../aboutus.html";
};

function goToNotification(){
  window.location.href = "../notifications.html";
};



var newsfeedApp = angular.module("newsfeedApp", []);

newsfeedApp.controller("newsfeedCtrl", ["$scope", function newsfeedCtrl($scope){
    Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");


  $scope.goToPost = function(index){
    window.location.href = "../post.html?" + $scope.posts[index].objectId;
  };


  //increment numLikes
  $scope.plusOne = function(index) {


    var query = new Parse.Query('Newsfeed');
    query.get($scope.posts[index].objectId, {
      success: function(newsfeed){

        var currentId = Parse.User.current().id; 
        var likedArray = newsfeed.get('liked');
        var result = $.inArray(currentId, likedArray);

        //user like a post
        if (result === -1){
          var Notification = Parse.Object.extend("Notification");
          var notif = new Notification();
          var owner = newsfeed.get('owner').id;
          notif.set("owner", owner);
          var content = Parse.User.current().get('firstName') + " " + Parse.User.current().get('lastName') + " liked your post.";
          notif.set("content", content);
          notif.set("type", "like");
          notif.set("user", Parse.User.current());
          notif.set("outgoing", newsfeed.id);
          notif.save();

          newsfeed.increment('numLikes');
          newsfeed.add('liked', currentId);
          newsfeed.save();
          $scope.posts[index].numLikes = newsfeed.get('numLikes');
          $scope.posts[index].btnText = 'Unlike';
          $scope.$digest();
        }

        //user unlike a post
        else {
          newsfeed.set('numLikes', newsfeed.get('numLikes') - 1);
          newsfeed.get('liked').splice(result, 1);
          newsfeed.save();
          $scope.posts[index].numLikes = newsfeed.get('numLikes');
          $scope.posts[index].btnText = 'Like';
          $scope.$digest();
        }

      },
      error: function(object, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

 
  };






	var query = new Parse.Query("Newsfeed");
  query.ascending("createdAt");
  query.include("owner");

	query.find({ 
  	success: function(newsfeeds) {
    	// newsfeeds now contains an array of newsfeed object retrieved from Parse
    	//alert("Successfully retrieved " + newsfeeds.length + " Newsfeed objects.");

      $scope.posts = []; //array for Newsfeed


    	for (var i = 0; i < newsfeeds.length; i++){
    		var newsfeed = newsfeeds[newsfeeds.length - i - 1];
  				    				
 
        $scope.posts[i] = {};
    		$scope.posts[i].message = newsfeed.get('message');
    		$scope.posts[i].numLikes = newsfeed.get('numLikes');
    		$scope.posts[i].numComments = newsfeed.get('numComments');
        $scope.posts[i].objectId = newsfeed.id;
        $scope.posts[i].btnText = 'Like';
        if (newsfeed.get('owner') !== undefined) {
          $scope.posts[i].firstName = newsfeed.get('owner').get('firstName');
          $scope.posts[i].lastName = newsfeed.get('owner').get('lastName');
          $scope.posts[i].picURL = newsfeed.get('owner').get('profilePicture').url();
        }
        $scope.$digest();



    	}



  	},

  	error: function(error) {
    	alert("Error: " + error.code + " " + error.message);
  	}
	});

}]);
