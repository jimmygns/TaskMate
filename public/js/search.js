
function search(){


Parse.initialize("ZLDPnL5t8AzKUzPF2OJfLcP7GGS5584iJSMGXkRS", "3VWB7w2Gri9KbRTmzKp8Lr6hInyAYaiSVjig87uB");
//var List = Parse.Object.extend("List");
var query = new Parse.Query(Parse.User);
var name = document.getElementById("keywords").value;
if(name===""){
  alert("username cannot be empty!");
  return;
}
query.contains("username",name);

query.find({
  success: function(results) {
    //alert("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    var ul = document.getElementById("results");
    ul.innerHTML='';
    if(results.length==0){
      alert("no user found!");
      return;
    }
    for (var i = 0; i < 10; i++) { 
      var object = results[i];
      /*
      if(object.get('id')===Parse.User.current().id){
        continue;
      }
      */
      var li = document.createElement("li");
      var text=document.createTextNode(object.get('username'));

      li.style.textAlign="justify";
      li.style.textIndent="10px";
      li.appendChild(text);
      li.className="list-group-item";
      li.style.fontSize="x-large";
      li.style.margin="10px 14px 10px 14px";
      li.style.padding="25px";


      //adding a button
      var button = document.createElement("button");
      button.className="btn btn-default";
      button.innerText="Follow";
      button.style.backgroundColor="#87CEEB";
      button.style.float="right";
      button.onclick=function toggle(){
        if(this.innerText==="Follow"){
          this.innerText="Following";
        }
        else{
          this.innerText="Follow";
        }
      };
      


      //loading profile pic
      var img=document.createElement("img");
      img.src="http://coolstatus.co/wp-content/uploads/2014/09/357201-how-to-lock-down-your-facebook-profile.jpg";
      img.className="img-circle";
      img.style.float="left";
      img.height="50";
      img.width="50";
      li.appendChild(img);
      li.appendChild(button);
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



