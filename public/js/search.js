

var SearchController=function ($scope){
  Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
  var id=location.search;
  var name = id.substring(1,id.length);
  $scope.searchInput=name; 

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

    var name=$scope.searchInput;


    
    var query = new Parse.Query(Parse.User);
    name = name.toLowerCase().trim();

    if(name===""){
      $scope.Results=[];
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
      return;
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
});
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
    
    var currentUser=Parse.User.current();
    var followingArray=currentUser.get('following');
    followingArray.push(userId);
    //alert(followingArray.length);
    currentUser.set("following",followingArray);
    currentUser.save();
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.get(userId, {
      success: function(user) {
    // The object was retrieved successfully.
    var newArray=user.get("followers");
    newArray.push(Parse.User.current().id);
    //alert(user.get('lastName'));
    user.set("lastName","test");
    user.set("followers",newArray);
    user.save();
    alert(user.get('followers'));
    
    Result.follow="Following";
    $scope.$digest();
    
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
  }
});
    
  }
  else{
    
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
    
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.get(userId, {
      success: function(user) {
    // The object was retrieved successfully.
    var newArray=user.get("followers");
    var index=0;
    //alert("there");
    for(var i=0; i<newArray.length; i++){
          
          if(newArray[i]==Parse.User.current().id){
            index=i;
            break;
          }
    }
    newArray.splice(index,1);
    user.set("followers",newArray);
    Result.follow="Follow";
    $scope.$digest();
    user.save();
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
  }
});


  }


};
//alert("call search when page is loaded");
$scope.search();


}

