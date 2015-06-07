var NotificationController=function($scope) {

	Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

  $scope.Notifications=[];

  Parse.Cloud.run('getNotifications', {}, 
    {
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          $scope.Notifications.push(results[i]);
        }
        $scope.$digest();
      },
      error: function(error) {
        alert("error");
      }
    }
  );
}

