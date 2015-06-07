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
    var picture = currentUser.get('profilePicture');
    if (picture != undefined)
    {
        $scope.picUrl = picture.url();
    }
    else
    {
        $scope.picUrl = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png';
    }
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
    Parse.Cloud.run('makeGoal', {goalName: goalName, date: stringDate, curDate: currentDate, listId: ListId, ownerName: ownerName}, {
        success: function(result) {
            //alert(result);
            location.reload();
        },
        error: function(error) {
            alert("Error of " + error.code + error.message);
        }
    });

}

}

function completeGoal(index) {

  var goal = incompleteGoal[index];
  var listID = goal.get('owner');
    Parse.Cloud.run('completeGoal', {listId: listID, ownerName: ownerName, goalId: goal.id }, {
        success: function(result) {
            //alert(result);
            location.reload();
        },
        error: function(error) {
            alert("Error of " + error.code + error.message);
        }
    });

}

function deleteGoal(index) {
  var goal = incompleteGoal[index];
  var listID = goal.get('owner');
    Parse.Cloud.run('deleteGoal', {listId: listID, goalId: goal.id }, {
        success: function(result) {
            //alert(result);
            location.reload();
        },
        error: function(error) {
            alert("Error of " + error.code + error.message);
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
