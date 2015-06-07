Parse.Cloud.define('signup', function(request, response) {

    var user = new Parse.User();
    console.log(request.params.email);
    if (request.params.email == null) {
        response.error("Don't forget to put your email :D");
        return;
    }
    else {
        user.set("username", request.params.email);
    }

    if (request.params.password == null) {
        response.error("Don't forget to put your password :D");
        return;
    }
    else {
        user.set("password", request.params.password);
    }

    user.set("email", request.params.email);

    // other fields can be set just like with Parse.Object
    if (request.params.firstName == null) {
        response.error("Don't forget to put your first name :D");
        return;
    }
    else {
        user.set("firstName", request.params.firstName);
    }

    if (request.params.lastName == null) {
        response.error("Don't forget to put your last name :D");
        return;
    }
    else {
        user.set("lastName", request.params.lastName);
    }

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
            response.success(fullNameStr + " created an account for " + request.params.email);
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            response.error("Please input correct email :D");
            return;
        }
    });
});