Parse.initialize("QjXPXme3VpSyKdvZKMDRXY5TmdOP7L6fxvysfdXq",
 "FB03u9unUQsaHY6PDpt1rxVIlzBfIPkubtssIKSz");

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


