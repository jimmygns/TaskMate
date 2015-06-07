

var SearchController=function ($scope){
  Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
  var id=location.search;
  var name = id.substring(1,id.length);
  $scope.searchInput=name;
  //console.log(name);
  if(name=="undefined"){
    //alert(name);
    $scope.searchInput="";
  }
  else{

    $scope.searchInput=name; 
  }

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

  function goToAboutUs(){
    window.location.href = "../aboutus.html";
  };

  $scope.search = function(){
    //console.log(name);

    var name=$scope.searchInput;
    name = name.toLowerCase().trim();
    if(name==""){
      $scope.Results=[];
      $scope.warning="No Result Found";
      return;
    }
    Parse.Cloud.run('searchUser',{searchInput: name},{
      success: function(result) {
        $scope.warning="";
        if(result.length==0){
          $scope.Results=[];
          $scope.warning="No Result Found";
          $scope.$digest();
          return;
        }
        $scope.Results=result;
        $scope.$digest();
      },
      error: function(error) {
        //alert("here");
        alert("Error of " + error.code + error.message);
      }
    });


    /*
    var query = new Parse.Query(Parse.User);
    name = name.toLowerCase().trim();
    $scope.warning="";
    if(name===""){
      $scope.Results=[];
      $scope.warning="No Result Found";
      //alert("username cannot be empty!");
      return;
    }
    query.startsWith("fullName",name);

    query.find({
      success: function(results) {
    //alert("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    var array=[];
    if(results.length==0){
      //alert("no user found!");
      //alert("what");
      $scope.warning="No Result Found";
      //return;
    }
    var arrayOfFollowings=Parse.User.current().get('following');
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      
      if(object.id==Parse.User.current().id){
        continue;
      }
      var followStatus="Follow";
      for(var j=0;j<arrayOfFollowings.length;j++){
        if(arrayOfFollowings[j]==object.id){

          followStatus="Following";
        }
      }
      
      //loading profile pic
      var pic = object.get('profilePicture');
      if (pic == null)
      {
        var picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png'
      }
      else
      {
        var picURL = pic.url();
      }
      var page='/profile.html?' + object.id;
      var user=object.get('firstName')+" "+object.get('lastName');
      //alert(user);
      array.push({
        profilePage: page,
        fullName: user,
        profilePicture: picURL,
        follow: followStatus,
      });
      //alert(array.length);
    }
    
    $scope.Results=array;
    $scope.$digest();


  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});*/



};

$scope.goProfile = function(){
  window.location.href = "./profile.html?" + Parse.User.current().id;
};

$scope.logOut = function(){
  Parse.User.logOut();
  window.location.href = "./index.html";
};

$scope.follow = function(Result){
  if(Result.follow=="Follow"){
    var page = Result.profilePage;
    var userId = page.substring(14,page.length);

    Parse.Cloud.run('follow',{followingId: userId},{
      success: function(result) {
        Result.follow="Following";
        Parse.Cloud.run('createNotification',{followingId: userId},{
          success: function(output) {
            $scope.$digest();
          },
          error: function(error){
            alert("Error of " + error.code + error.message);
          }
        });
      },
      error: function(error) {
        //alert("here");
        alert("Error of " + error.code + error.message);
      }
    });

    /*
    var page = Result.profilePage;
    var userId = page.substring(14,page.length);
    var currentUser=Parse.User.current();
    var followingArray=currentUser.get('following');
    followingArray.push(userId);
    //alert(followingArray.length);
    currentUser.set("following",followingArray);
    currentUser.save();
    Result.follow="Following";
    
    //create notification when pressing Follow
    var Notification = Parse.Object.extend("Notification");
    var notif = new Notification();
    var User = Parse.Object.extend("User");
    var user_query = new Parse.Query(User);
    user_query.include("owner");
    user_query.get(userId, {
        success: function(result) {
        // The object was retrieved successfully.
        notif.set("owner",userId);
        notif.set("outgoing",currentUser.id);
        notif.set("user", result);                   
        notif.set("type","follow");
        var notif_content = currentUser.get('firstName')+" "+currentUser.get('lastName') + " started following you.";
        notif.set("content",notif_content);
        notif.save();
    },
    error: function(object, error) {
    }
});
    $scope.$digest();
    */
  }
  else{
    var page = Result.profilePage;
    var userId = page.substring(14,page.length);

    Parse.Cloud.run('unfollow',{followingId: userId},{
      success: function(result) {
        Result.follow="Follow";
        $scope.$digest();
      },
      error: function(error) {
        //alert("here");
        alert("Error of " + error.code + error.message);
      }
    });

  }

    /*
    var page = Result.profilePage;
    var userId = page.substring(14,page.length);
    
    var currentUser=Parse.User.current();
    var followingArray=currentUser.get('following');
    var position=0;
    
    for(var i=0; i<followingArray.length; i++){
          
          if(followingArray[i]==userId){
            position=i;
            break;
          }
    }
    
    followingArray.splice(position,1);
    currentUser.set("following",followingArray);
    currentUser.save();
    Result.follow="Follow";
    $scope.$digest();
  }
  */

};
//alert("call search when page is loaded");
$scope.search();


}

