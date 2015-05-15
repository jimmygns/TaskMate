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
	//if(Parse.User.current() == null){
	  //alert("logged out");
	//}
    window.location.href = "../index.html";
};

var newsfeedApp = angular.module("newsfeedApp", []);

newsfeedApp.controller("newsfeedCtrl", ["$scope", function newsfeedCtrl($scope){
    Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

	var query = new Parse.Query("Newsfeed");
	query.find({
  	success: function(newsfeeds) {
    	// newsfeeds now contains an array of newsfeed object retrieved from Parse
    	alert("Successfully retrieved " + results.length + " Newsfeed objects.");
    	for (var i = 0; i < results.length; i++){
    		var newsfeed = newsfeeds[i];
    	}
  	},

  	error: function(error) {
    	alert("Error: " + error.code + " " + error.message);
  	}
	});

}]);
