function input(){
  var id=location.search;
  var name = id.substring(1,id.length);
  document.getElementById("keywords").value=name;
  search();
}


function search(){


    Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63", "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");
//var List = Parse.Object.extend("List");
var query = new Parse.Query(Parse.User);
var name = document.getElementById("keywords").value;
    name = name.toLowerCase();
var ul = document.getElementById("results");
ul.innerHTML='';
if(name===""){
  alert("username cannot be empty!");
  return;
}
query.contains("fullName",name);

query.find({
  success: function(results) {
    //alert("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    
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
      var text=document.createTextNode(object.get('firstName') + " " + object.get('lastName'));

      li.style.textAlign="justify";
      li.style.textIndent="10px";
      li.className="list-group-item";
      li.style.fontSize="x-large";
      li.style.margin="10px 14px 10px 14px";
      li.style.padding="25px";


        var link = document.createElement('a'); // create the link
        link.setAttribute('href', '/profile.html?' + object.id);
        link.appendChild(text);

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
        var pic = object.get('profilePicture');
        if (pic == null)
        {
            picURL = 'http://cdn.cutestpaw.com/wp-content/uploads/2012/06/l-Bread-Cat-FTW.png'
        }
        else
        {
            picURL = pic.url();
        }
        var img=document.createElement("img");
        img.src=picURL;
        img.className="img-circle";
        img.style.float="left";
        img.height="50";
        img.width="50";

        var link2 = document.createElement('a'); // create the link
        link2.setAttribute('href', '/profile.html?' + object.id);
        link2.appendChild(img);

        li.appendChild(link);
        li.appendChild(link2);
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



