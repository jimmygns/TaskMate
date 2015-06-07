
/* Controller for the newsfeed objects */
var NewsfeedController =function ($scope){
	/* Get the Parse database */
	Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
	
    /* Initialize variables */
    var Newsfeed = Parse.Object.extend("Newsfeed");
	var query = new Parse.Query(Newsfeed);
    var address=location.search;
    var id=address.substring(1,address.length);
    var current_Id = Parse.User.current().id;
    var ownerId;
    var owner;

    /* Run the cloud code to get the post */
    Parse.Cloud.run('getPost', {objectId: id},{
        success: function(result){
            /* Set the variables accordingly */
            var flag = true;
            ownerId = result.get('owner').id;
            var object = result;
            var messageStr = object.get('message');
            var likes = object.get('numLikes');
            var arrayOfUsers = object.get('liked');

            $scope.message = messageStr;

            /* Find user that equals current id */
            if(arrayOfUsers!=null){
                for(var i=0; i<arrayOfUsers.length; i++){
                    if(arrayOfUsers[i]==current_Id){
                        flag=false;
                        $scope.Like = likes+" Unlike";
                        break;
                    }
                }            
            }
            /* Set the likes */
            if(flag){
                $scope.Like = likes + " Like";
            }
            $scope.$digest();

    /* Retrieve the user object, owner of the post */
    Parse.Cloud.run('getUserInfo', {objectId: ownerId}, {
        success: function(result){
            var name=result.get('firstName')+" "+result.get('lastName');
            /* Set the profile picture to display */
            var image=result.get('profilePicture');
            if (image == undefined)
            {
                
                var picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png';
            }
            else
            {
                
                var picURL = image.url();
            }
            /* Set profile */
            $scope.username = name;
            $scope.profilePicture = picURL;
            $scope.profilePage = "../profile.html?" + ownerId;
            $scope.$digest(); 
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
            
    });

	$scope.Comments=[];
    /* Run the cloud code to display the comments */
	Parse.Cloud.run('displayComment', {objectId: id}, {
        success: function(results){
            for (var i = 0; i < results.length; i++) { 
                /* Set the variables */
                var object = results[i];
                var contentToShow = object.get('content');
                var person = object.get("userPointer");
                var profilePage="../profile.html?" + person.id;
                /* Get the profile picture */
                var image=person.get('profilePicture');
                if (image == undefined)
                {
                    var picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png';
                }
                else
                {
                    var picURL = image.url();
                }
                /* Get the name and push the commenter's info */
                var fullName=person.get('firstName')+" "+person.get('lastName');           
                $scope.Comments.push({content: contentToShow, 
                username: fullName, 
                commenterProfilePage: profilePage,
                commenterProfilePicture: picURL, 
            });
            }
            $scope.$digest();
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
},
error: function(object, error) {
    /* The object was not retrieved successfully. */
    alert("Error.");
}
});

/* Function for likes */
$scope.like = function(){
	var status=document.getElementById('likeThePost').innerText;
	query.get(id, {
		success: function(result) {
			var temp=result.get('numLikes');
			var arrayOfUsers=result.get('liked');

			if(status.match("Unlike")==null){
				
				result.set('numLikes',temp+1);
				result.add('liked',current_Id);
				$scope.Like=result.get('numLikes')+" Unlike";

                /* Create a notification when pressing like button */
                var Notification = Parse.Object.extend("Notification");
                var notif = new Notification();

                var User = Parse.Object.extend("User");
                var user_query = new Parse.Query(User);
                user_query.get(current_Id, {
                    success: function(result) {
                    /* The object was retrieved successfully. */

                    /* Save the new notification with fields */
                    notif.set("owner",owner);
                    notif.set("outgoing",id);
                    notif.set("user", result);                   
                    notif.set("type","like");
                    var notif_content=result.get('firstName')+" "+result.get('lastName')+" liked your post.";
                    notif.set("content",notif_content);
                    notif.save();
                },
                    error: function(object, error) {
                    }
                });

				result.save();
			}
			else{
                /* Set the number of likes to decrement */
				result.set('numLikes',temp-1);
				var index=0;
				for(var i=0; i<arrayOfUsers.length; i++){
					
					if(arrayOfUsers[i]==Parse.User.current().id){
						index=i;
						break;
					}
				}
				arrayOfUsers.splice(index,1);
				result.set('liked',arrayOfUsers);
				$scope.Like=result.get('numLikes')+" Like";
				result.save();
			}
			$scope.$digest();
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}


	});


}


/* Function to add comment */
$scope.addComment=function(){

    /* Initialize variables */
	var Comment=Parse.Object.extend("Comment");
	var comment=new Comment();
    var User = Parse.Object.extend("User");
    var user = new User();
    user.id = current_Id;
 
    /* Get the user corresponding to the id */   
    query.get(id, {
        success: function(result) {
            /* Save the result */
            result.set('numComments',result.get('numComments')+1);
            result.save();
        },
        error: function(error) {
            alert("alert");
            alert("Error: " + error.code + " " + error.message);
        }
    });
	
    /* Set and save the new comment */
	comment.set('owner',id);
	comment.set('user',current_Id);
    
    comment.set('userPointer',user);

	var input=document.getElementById("commentInput").value;
	comment.set('content',input);
	comment.save();


    /* create a notification when pressing like button */
    var Notification = Parse.Object.extend("Notification");
    var notif = new Notification();

    var User = Parse.Object.extend("User");
    var user_query = new Parse.Query(User);

    user_query.get(current_Id, {
        success: function(result) {
        /* The object was retrieved successfully. 
         Set and save the new notification object */
        notif.set("owner",owner);
        notif.set("outgoing",id);
        notif.set("user", result);                   
        notif.set("type","comment");
        var notif_content=result.get('firstName')+" "+result.get('lastName')+" commented on your post.";
        notif.set("content",notif_content);
        notif.save();
        location.reload();
    },
    error: function(object, error) {
        alert("Error of " + error.message);
    }
});
    
}


    /* Get the pictures/notifications to display */
    $scope.profilePictureURL = "img/glyphicons-4-user.png";

    $scope.numberOfNotification = Parse.User.current().get('numNotif');

    $scope.profilePictureURL = "img/glyphicons-4-user.png";

    picture = Parse.User.current().get("profilePicture");
    if (picture != undefined) {
        $scope.profilePictureURL = picture.url();
    }

    /* Functions to redirect in navigation bar */
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


