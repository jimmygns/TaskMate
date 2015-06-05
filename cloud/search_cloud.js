Parse.Cloud.define("searchUser", function(request, response) {
    var name=request.params.searchInput;
    var query = new Parse.Query(Parse.User);
    alert(name);
    query.startsWith("fullName",name);

    query.find({
      success: function(results) {
    //alert("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    var array=[];
    
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
      alert(array.length);
    }
    
    response.success(array);
  },
  error: function(error) {
  	//alert("error here");
    response.error("Error: " + error.code + " " + error.message);
  }
});

    
});