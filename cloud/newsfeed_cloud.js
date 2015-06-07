Parse.Cloud.define("changeNumLike", function(request, response){
	var postID = request.params.newsfeedID;


    var query = new Parse.Query('Newsfeed');
    query.include("owner");
    query.get(postID, {
      success: function(newsfeed){

        var currentId = Parse.User.current().id; 
        var likedArray = newsfeed.get('liked');

        if(likedArray == undefined)
          likedArray = [];

        var result = -1;
        for(var i = 0; i < likedArray.length; i++){
          if(likedArray[i] === currentId){
            result = i;
            break;
          }
        }

        var results = [];
        results[0] = result;

        //user like a post
        if (result === -1){
          var Notification = Parse.Object.extend("Notification");
          var notif = new Notification();
          var owner = newsfeed.get('owner').id;

          Parse.Cloud.useMasterKey();
          var ownerPtr = newsfeed.get('owner');
          ownerPtr.increment('numNotif');

          notif.set("owner", owner);
          var content = Parse.User.current().get('firstName') + " " + Parse.User.current().get('lastName') + " liked your post.";
          notif.set("content", content);
          notif.set("type", "like");
          notif.set("user", Parse.User.current());
          notif.set("outgoing", newsfeed.id);
          notif.save();

          newsfeed.increment('numLikes');
          newsfeed.add('liked', currentId);
          newsfeed.save();
          results[1] = newsfeed.get("numLikes");

          response.success(results);
        }

        //user unlike a post
        else {
          newsfeed.set('numLikes', newsfeed.get('numLikes') - 1);
          newsfeed.get('liked').splice(result, 1);
          newsfeed.save();
          results[1] = newsfeed.get("numLikes");

          response.success(results);
        }

      },
      error: function(object, error) {
        response.error("Error: " + error.code + " " + error.message);
        return;
      }
    });
});