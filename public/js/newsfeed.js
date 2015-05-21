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
	//alert(text);
	window.location.href = "../profile.html?" + text;
};

function logOut(){
	Parse.User.logOut(); 
    window.location.href = "../index.html";
};

var newsfeedApp = angular.module("newsfeedApp", []);

newsfeedApp.controller("newsfeedCtrl", ["$scope", function newsfeedCtrl($scope){
    Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

	var query = new Parse.Query("Newsfeed");


	query.find({ 
  	success: function(newsfeeds) {
    	// newsfeeds now contains an array of newsfeed object retrieved from Parse
    	alert("Successfully retrieved " + newsfeeds.length + " Newsfeed objects.");


      $scope.posts = []; //array for Newsfeed


    	for (var i = 0; i < newsfeeds.length; i++){
    		var newsfeed = newsfeeds[i];

        
/*      $scope.user_objectId = newsfeed.get('owner');
    		var userQuery = new Parse.Query("User");
    		userQuery.get($scope.user_objectId, {
    			success: function(user) {
    				//The object was retrieved successfully.
            $scope.posts1.push(user.get('username'));
    				//$scope.posts1[i].username = user.get('username');
            $scope.$digest();
    			},
    			error: function(object, error){
    				//The object was not retrieved successfully
    				alert("Error: " + error.code + " " + error.message);
    			} 
    		});
  				    				

        
        $scope.goal_objectId = newsfeed.get('goal');
   			var goalQuery = new Parse.Query("Goal");
    		goalQuery.get($scope.goal_objectId, {
  				success: function(goal) {
    				// The object was retrieved successfully.
            $scope.posts2[i] = {};
    				$scope.posts2[i].goal_name = goal.get('name');
    				$scope.posts2[i].goal_dueDate = goal.get('dueDate');
            $scope.$digest();
  				},
  				error: function(object, error) {
    				// The object was not retrieved successfully.
    				alert("Error: " + error.code + " " + error.message);
  				}
			  });

        //no need to do that
    		$scope.list_objectId = newsfeed.get('list');
    		var listQuery = new Parse.Query("List");
    		listQuery.get($scope.list_objectId, {
  				success: function(list) {
    				// The object was retrieved successfully.
            $scope.posts3[i] = {};
    				$scope.posts3[i].list_name = list.get('name');
            $scope.$digest();
  				},
  				error: function(object, error) {
    				// The object was not retrieved successfully.
    				alert("Error: " + error.code + " " + error.message);
  				}
			  });    */

        $scope.posts[i] = {};
    		$scope.posts[i].message = newsfeed.get('message');
    		$scope.posts[i].numLikes = newsfeed.get('numLikes');
    		$scope.posts[i].numComments = newsfeed.get('numComments');
        $scope.$digest();




    	}



  	},

  	error: function(error) {
    	//alert("Error: " + error.code + " " + error.message);
  	}
	});

}]);
