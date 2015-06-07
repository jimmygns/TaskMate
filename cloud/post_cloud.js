

Parse.Cloud.define("getPost", function(request, response){
	var Newsfeed = Parse.Object.extend("Newsfeed");
	var id = request.params.objectId;
	var query = new Parse.Query(Newsfeed);
	
	var owner;
	query.include('owner');

	query.get(id, {
		success: function(result) {
    		// The object was retrieved successfully.
        	var object = result;
    		var messageStr = object.get('message');
    		var likes = object.get('numLikes');
    		var arrayOfUsers = object.get('liked');

    		owner = object.get('owner').id;
    		response.success(result);
    	},
  		error: function(object, error) {
    		response.error("Error1: " + error.code + " " + error.message);
            return;
  		}
	});
});

Parse.Cloud.define("getUserInfo", function(request, response){
	var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    var ownerId = request.params.objectId;

	query.get(ownerId, {
    	success: function(result) {
    		var name=result.get('firstName')+" "+result.get('lastName');
    		var image=result.get('profilePicture');
            
    		if (image == undefined)
    		{
                
    			var picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png';
    		}
    		else
    		{
                
    			var picURL = image.url();
    		}
    		response.success(result);

    	},
    	error: function(error) {
    		response.error("Error2: " + " " + error.message);
            return;
    		//alert("Error: " + error.code + " " + error.message);
    	}
    });
});


Parse.Cloud.define("displayComment", function(request, response){
	var Comment = Parse.Object.extend("Comment");
	var ownerId = request.params.objectId;
	var query = new Parse.Query(Comment);
	query.equalTo('owner', ownerId);
    query.include('userPointer');

	query.find({
		success: function(results) {

    		/*for (var i = 0; i < results.length; i++) { 
    			var object = results[i];
    			var contentToShow = object.get('content');
        		var person = object.get("userPointer");
        		var profilePage="../profile.html?" + person.id;
        		var image=person.get('profilePicture');
        		if (image == undefined)
        		{
            		var picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png';
        		}
        		else
        		{
            		var picURL = image.url();
        		}
        		var fullName=person.get('firstName')+" "+person.get('lastName');*/
        		response.success(results);
    //}


},
error: function(error) {
	alert("comments alert");
	alert("Error: " + error.code + " " + error.message);
}
});
});
