Parse.initialize("eVEt0plCyNLg5DkNtgBidbruVFhqUBnsMGiiXp63",
    "KPiNXDn9LMX17tLlMmSbI4NvTKgWPk36qBLMTqco");

function redirect(){
	var text = document.getElementById("searchInput").value;
	window.location.href = "../search.html?" + text;
};

function goToProfile(){
	var text = Parse.User.current().id;
	//alert(text);
	window.location.href = "../profile.html?" + text;
};

function logOut(){
	Parse.User.logOut();
	//if(Parse.User.current() == null){
	  //alert("logged out");
	//}
    window.location.href = "../index.html";
};


