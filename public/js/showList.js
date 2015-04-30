Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

var List = Parse.Object.extend("List");
var Goal = Parse.Object.extend("Goal");
var incompleteGoal = [];
//var index = 0;

function GoalController($scope) {
     var lists = new Parse.Query(List);
     var name = localStorage.getItem('name');

     lists.equalTo("name", name);
  	 var listID;

     lists.find({
       success: function(results) {
         for (var i = 0; i < results.length; i++) {
           listID = results[i].id;
         }

         var goals = new Parse.Query(Goal);
         goals.equalTo("owner", listID);
         var completedGoalName = [];
         var incompleteGoalName = [];
         var incompleteGoalDueDate = [];

         goals.find({
           success: function(results) {
             for (var i = 0; i < results.length; i++) {
               if (results[i].get('completed') == true){
                completedGoalName.push(results[i].get('name'));
               }
               else {
               	incompleteGoalName.push(results[i].get('name'));
                incompleteGoal.push(results[i]);
                incompleteGoalDueDate.push(results[i].get('dueDate').toDateString());
               }
             }

             $scope.CompletedGoals=[];
             $scope.IncompleteGoals=[];

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
         })

       },
       error: function(error) {
         alert("Error: " + error.code + " " + error.message);
       }
     })
}

function addGoal() {
  var goalName = prompt("Enter the name: ");
  var stringDate = prompt("Enter the due date in format YYYY-MM-DD: ");
   
  if (goalName.length > 0) {
    var lists = new Parse.Query(List);
    var listName = localStorage.getItem('name');

    lists.equalTo("name", listName);
    var listID;

    lists.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          listID = results[i].id;
        }
        
        var goal = new Goal();

        goal.set("name", goalName);

        goal.set("owner", listID);
      
	if (stringDate.length > 0) {
           goal.set("dueDate", new Date(stringDate));
        } else {
           goal.set("dueDate", new Date());
	}
        goal.set("completed", false);

        goal.save();

        location.reload();

      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    })
  }
  else {
    alert("Cannot read the name!");
    addGoal();
  }

}

function completeButton(index) {  
  var goal = incompleteGoal[index];
  goal.set('completed', true);

  goal.save();

  location.reload();
}

function deleteGoal(index) {
  var goal = incompleteGoal[index];
  goal.destroy({
	  success: function(goal) {
	  	alert("Goal is deleted!");
  	},
  error: function(error) {
	  alert("Goal could not be deleted.");
  }
  });

  location.reload();
}

$(function() {
	$('.list-group-item > .show-menu').on('click', function(event) {
		event.preventDefault();
		$(this).closest('li').toggleClass('open');
	});
});
