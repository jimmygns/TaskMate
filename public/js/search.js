function search(){

Parse.initialize("ZLDPnL5t8AzKUzPF2OJfLcP7GGS5584iJSMGXkRS", "3VWB7w2Gri9KbRTmzKp8Lr6hInyAYaiSVjig87uB");
var List = Parse.Object.extend("List");
var query = new Parse.Query(List);
var name = prompt("Enter the name: ");

query.equalTo("Name",name);

var array=[];

query.find({
  success: function(results) {
    alert("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      array.push(object);
      alert(object.id + ' - ' + object.get('Name'));
    }

    for(var i = 0; i < array.length;i++){
	    document.getElementById("search").innerHTML+= object.get('Name');
    }
	
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});


}
