Parse.Cloud.define("test2", function(request, response) {
    var myColor = request.params.color;
    response.success("My color is " + myColor);
});

