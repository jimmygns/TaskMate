Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");



var List = Parse.Object.extend("List");
var Goal = Parse.Object.extend("Goal");
var Newsfeed = Parse.Object.extend("Newsfeed");
var incompleteGoal = [];
var name;
var ListId = location.search;
ListId = ListId.slice(1);
var ownerID;
var owner;
var ownerName;
var goalName;

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

function infoCtrl($scope){
  var currentUser = Parse.User.current();
  $scope.picUrl = currentUser.get("profilePicture").url();
  $scope.firstName = currentUser.get("firstName");
  $scope.lastName = currentUser.get("lastName");

}

function GoalController($scope) {
     var lists = new Parse.Query(List);

     lists.equalTo("objectId", ListId);

     var description;

     lists.find({
       success: function(results) {
         for (var i = 0; i < results.length; i++) {
             description = results[i].get("description");
             ownerID = results[i].get('owner');
             var User = Parse.Object.extend("User");
             var query = new Parse.Query(User);
             query.equalTo("objectId", ownerID);
             query.find({
                 success: function(results) {
                     for (var i = 0; i < results.length; i++) {
                         owner = results[i];
                         ownerName = owner.get("firstName") + " " + owner.get("lastName");
                     }
                 },
                 error: function(error) {
                     alert("Error: " + error.code + " " + error.message);
                 }
             });
             name = results[i].get("name");
         }

         var goals = new Parse.Query(Goal);
         goals.equalTo("owner", ListId);
         var completedGoalName = [];
         var incompleteGoalName = [];
         var incompleteGoalDueDate = [];

         goals.find({
           success: function(results) {
             for (var i = 0; i < results.length; i++)
             {

               if (results[i].get('completed') === true){
                completedGoalName.push(results[i].get('name'));
               }
               else
               {
                incompleteGoalName.push(results[i].get('name'));
                incompleteGoal.push(results[i]);
    if (results[i].get('dueDate')===null)
        {
      incompleteGoalDueDate.push("");
    } else
        {
                incompleteGoalDueDate.push(results[i].get('dueDate').toDateString());
    }   }
             }
             $scope.Descriptions=[];
             $scope.CompletedGoals=[];
             $scope.IncompleteGoals=[];
               $scope.Name = name;


       $scope.Descriptions.push({name: description});

             for(var i = 0; i < completedGoalName.length; i++) {
               $scope.CompletedGoals.push({name: completedGoalName[i]});
             }

             for(var i = 0; i < incompleteGoalName.length; i++) {
               $scope.IncompleteGoals.push({name: incompleteGoalName[i], dueDate: incompleteGoalDueDate[i]});
             }         

             $scope.$digest();
           },
           
           error: function(error) {
             alert("Error: " + error.code + " " + error.message);
           }
         });

       },
       error: function(error) {
         alert("Error: " + error.code + " " + error.message);
       }
     });

  //check whether to display "Create Goal" button on listPage 
  var currentUserId = Parse.User.current().id;
  var query = new Parse.Query("List");
  query.get(ListId, {
    success: function(list){
      var listOwnerId = list.get('owner');
      if(currentUserId === listOwnerId){
        console.log("isCurrentUser is true");
        document.getElementById("newGoalBtn").style.visibility = "visible";
      }
      else{
        console.log("isCurrentUser is false");
        document.getElementById("newGoalBtn").style.display = "none";
      }

    },

    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });

$scope.addGoal = function() {
  	goalName = document.getElementById('goalDesc').value;
  	var stringDate = document.getElementById('goalDate').value;
        var dateString;
    var deadline;
    var currentDate = new Date();
  	if (goalName.length > 0) {

        var goal = new Goal();
	
        var newsfeed = new Newsfeed();

        goal.set("name", goalName);

        goal.set("owner", ListId);
		if (stringDate.length > 0) {
           deadline = new Date(stringDate);
           goal.set("dueDate", deadline);
           dateString = goal.get("dueDate").toDateString();
        } else {
           goal.set("dueDate", null);
           dateString = "";
		}
        goal.set("completed", false);

    if (deadline < currentDate) {
      alert("Invalid date!");
    } else {
		goal.save(null, {
		    success: function(goal) {
			    newsfeed.set('goal', goal.id);
			    console.log("Goal ID:");
				console.log(goal.id);
				newsfeed.set('list', ListId);
				newsfeed.set('owner', owner);
				newsfeed.set('message', ownerName + " has created goal \n \"" + goalName + "\"");
				newsfeed.set('numLikes', 0);
				newsfeed.set('numComments', 0);
				newsfeed.save(null, {
					success: function(newsfeed) {
						console.log("Saved newsfeed");
					},
					error: function(newsfeed, error) {
						console.log("error in saving");
					}
				});
				incompleteGoal.push(goal);
		   		$scope.IncompleteGoals.push({name: goal.get("name"), dueDate: dateString });
		   		$scope.$digest();
		   },
		   error: function(goal, error) {
			   console.log(error);
		   }
	   });
    }
  }
  else {
    alert("Cannot read the name!");
  }

}



}

function completeGoal(index) {

  var goal = incompleteGoal[index];
  var listID = goal.get('owner');
  var query = new Parse.Query('List');
  query.get(listID, {
    success: function(list){
      var listOwner = list.get('owner');
      if(Parse.User.current().id !== listOwner){
        alert("You can only complete your own goals!");
      } 
      else {
        goalName = goal.get("name");
        goal.set('completed', true);
        var newsfeed = new Newsfeed();
  
        newsfeed.set('goal', goal.id);
        newsfeed.set('list', ListId);
        newsfeed.set('owner', owner);
        newsfeed.set('message', ownerName + " has completed goal \n\"" + goalName +"\"");
        newsfeed.set('numLikes', 0);
        newsfeed.set('numComments', 0);
 
        var array = [];
        array.push(goal);
        array.push(newsfeed); 
        Parse.Object.saveAll(array, {
          success: function(array){
            console.log("success");
          },
          error: function(error) {

          }
        });

        location.reload();
      }
    },

    error: function(object, error) {
        alert("Error: " + error.code + " " + error.message);
    }
  });

}

function deleteGoal(index) {
  var goal = incompleteGoal[index];
  var listID = goal.get('owner');
  var query = new Parse.Query('List');
  query.get(listID, {
    success: function(list){
      var listOwner = list.get('owner');
      if(Parse.User.current().id !== listOwner){
        alert("You can only delete your own goals!");
      } 
      else{
        goal.destroy({
          success: function(goal) {
          },

          error: function(goal, error) {
          }
        });

        location.reload();
      }
    },

    error: function(object, error) {
        alert("Error: " + error.code + " " + error.message);
    }
  });

}

function showMenu(index){
  console.log("here");
  var id = "#" + index;
  $("#"+index).toggleClass('open');
}


function showInProgress() {
  if (document.getElementById('InProgress').style.display === "none") {
    document.getElementById('InProgress').style.display = "";
  }
  else {
    document.getElementById('InProgress').style.display = "none";
  }
}
function showComplete() {
  if (document.getElementById('Complete').style.display === "none") {
    document.getElementById('Complete').style.display = "";
  }
  else {
    document.getElementById('Complete').style.display = "none";
  }
}

function setDisplay() {
   document.getElementById('InProgress').style.display = "";
   document.getElementById('Complete').style.display = "none";
}
