
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
		}		}
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

$scope.addGoal = function() {
  	var goalName = prompt("Enter the name: ");
  	var stringDate = prompt("Enter the due date in format MONTH DAY, YEAR: ");
   
  	if (goalName.length > 0) {

        var goal = new Goal();
	
        var newsfeed = new Newsfeed();

        goal.set("name", goalName);

        goal.set("owner", ListId);
      
		if (stringDate.length > 0) {
           goal.set("dueDate", new Date(stringDate));
        } else {
           goal.set("dueDate", null);
		}
        goal.set("completed", false);

		goal.save(null, {
		    success: function(goal) {
			    newsfeed.set('goal', goal.id);
			    console.log("Goal ID:");
				console.log(goal.id);
				newsfeed.set('list', ListId);
				newsfeed.set('owner', owner);
				newsfeed.set('message', "User has created goal!");
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
		   		$scope.IncompleteGoals.push({name: goal.get("name"), dueDate: goal.get("dueDate")});
		   		$scope.$digest();
		   },
		   error: function(goal, error) {
			   console.log(error);
		   }
	   });
  }
  else {
    alert("Cannot read the name!");
    //addGoal();
  }

}


}

function completeGoal(index) {  
  var goal = incompleteGoal[index];

  goal.set('completed', true);
  var newsfeed = new Newsfeed();
  
  newsfeed.set('goal', goal.id);
  newsfeed.set('list', ListId);
  newsfeed.set('owner', owner);
  newsfeed.set('message', "User has completed goal!"),
  newsfeed.set('numLikes', 0);
  newsfeed.set('numComments', 0);
/* 
  Parse.Cloud.beforeSave("Newsfeed", function(request, response) {
       var likes = request.object.get('numLikes');
       if (likes < 0) {
          response.error("invalid number of likes");
       }
       var comments = request.object.get('numComments');
       if (comments < 0) {
          response.error("invalid number of comments");
        }
       response.success();
   }); */
 
  var array = [];
  array.push(goal);
  array.push(newsfeed); 
  Parse.Object.saveAll(array, {
   success: console.log("success"),
   error: function(error) {}});

  location.reload();
}

function deleteGoal(index) {
  var goal = incompleteGoal[index];
  goal.destroy({
	  success: function(goal) {
  	},
      error: function(goal, error) {
    }
  });

  location.reload();
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

