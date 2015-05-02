
function search(){


Parse.initialize("ZLDPnL5t8AzKUzPF2OJfLcP7GGS5584iJSMGXkRS", "3VWB7w2Gri9KbRTmzKp8Lr6hInyAYaiSVjig87uB");

//var List = Parse.Object.extend("List");
var query = new Parse.Query(Parse.User);
var name = prompt("Enter the name: ");

query.contains("username",name);


query.find({
  success: function(results) {
    alert("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    var ul = document.getElementById("results");
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(object.get('username')));
      ul.appendChild(li);
      //document.getElementById("results").innerHTML+=object.get('username')+'\r\n';
      //alert(object.id + ' - ' + object.get('username'));
    }

   
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});


}
