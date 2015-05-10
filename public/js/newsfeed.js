Parse.initialize("QjXPXme3VpSyKdvZKMDRXY5TmdOP7L6fxvysfdXq",
 "FB03u9unUQsaHY6PDpt1rxVIlzBfIPkubtssIKSz");

function redirect(){
	var text = document.getElementById("searchInput").value;
	//alert(text);
	window.location.href = "../search.html?" + text;
	//alert("../search.html?" + text);
};

function goToProfile(){
	var text = Parse.User.current().id;
	alert(text);
	window.location.href = "../profile.html?" + text;
};


