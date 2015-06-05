var NotificationController=function($scope) {

	Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

	var Notification = Parse.Object.extend("Notification");
	var images = [];
	var notifications = new Parse.Query(Notification);
	notifications.include("user");

  notifications.equalTo("owner", Parse.User.current().id);

  Parse.User.current().set("numNotif", 0);
  Parse.User.current().save();

  notifications.descending("createdAt");
  notifications.limit(15);

  var outgoing = [];
  var content = [];

  $scope.Notifications=[];
  var position = 0;
  
  notifications.find({
    success: function(results) {
      for (var i = 0; i < results.length; i++) {
      	var object = results[i];
        $scope.Notifications.push({content: object.get('content'),
		                          		 outgoing: "",
				                           image: ""});


        switch (object.get('type')) {
       		case "like":
       			outgoing.push("post.html?" + object.get('outgoing'));
           	break;
        	case "comment":
       			outgoing.push("post.html?" + object.get('outgoing'));
       			break;
          case "follow":
       			outgoing.push("profile.html?" + object.get('outgoing'));
       			break;
        }

	
        var user=object.get('user');
        var image = user.get('profilePicture');
        if (image == undefined) {
        		picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/1-Bread-Cat-FTW.png';
   			} 
        else {
          picURL = image.url();
        }

      	$scope.Notifications[position].outgoing = outgoing[position];
        $scope.Notifications[position].image=picURL;

        position++;
		    $scope.$digest();
      }
    },
    error: function(error) {
      alert("No unread notifications");
    }
  });
}

