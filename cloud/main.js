require('cloud/anotherFile.js')
require('cloud/index_cloud.js')
require('cloud/List_cloud.js')
require('cloud/Profile_cloud.js')
require('cloud/search_cloud.js')
require('cloud/showList_cloud.js')
require('cloud/signup_cloud.js')

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("test", function(request, response) {
    var list = Parse.Object.extend("List");
    var query = new Parse.Query(list);

    query.find({
        success: function(results) {
            alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            response.success("Found " + results.length + " lists");
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
});
