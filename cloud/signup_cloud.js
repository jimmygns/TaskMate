Parse.Cloud.define('signup', function(request, response) {

    var user = new Parse.User();

 user.set("username", request.params.email);
    user.set("password", request.params.password);
    user.set("email", request.params.email);

    // other fields can be set just like with Parse.Object
    user.set("firstName", request.params.firstName);
    user.set("lastName", request.params.lastName);

    var fullNameStr = (request.params.firstName + " " + request.params.lastName);
    fullNameStr = fullNameStr.toLowerCase();

    user.set("fullName", fullNameStr);
    user.set("numNotif", 0);
    user.set("following", []);
    user.set("followers", []);

    alert("Signing up now");

    user.signUp(null, {
        success: function(user) {
            // Hooray! Let them use the app now.
            response.success();
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            response.error("Error: " + error.code + " " + error.message);
            return;
        }
    });
});