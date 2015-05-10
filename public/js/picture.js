Parse.initialize("QjXPXme3VpSyKdvZKMDRXY5TmdOP7L6fxvysfdXq",
 "FB03u9unUQsaHY6PDpt1rxVIlzBfIPkubtssIKSz");

var picApp = angular.module("picApp", []);

picApp.controller("picCtrl", ["$scope", function picCtrl($scope){

  $scope.upload = function(){

	var fileUploadControl = document.getElementById("profilePhotoFileUpload");

	if (fileUploadControl.files.length > 0) {
  		var file = fileUploadControl.files[0];
  		var name = "profilePic.jpg";

  		var parseFile = new Parse.File(name, file);


  		parseFile.save().then(function() {
  		// The file has been saved to Parse.

  		//associate the profile photo with the user, need to get the current user
  		   var Pic = Parse.Object.extend("Pic");
  		   var pic1 = new Pic();
		   pic1.set("profilePic", parseFile);
		   pic1.save(); 

		   alert("The picture has been successfully uploaded.");
		   
		   $scope.picUrl = parseFile.url();
		   $scope.$digest();


		}, function(error) {
  			// The file either could not be read, or could not be saved to Parse.
  			alert("The picture cannot be uploaded, please try again.");
		});
	}
  };


}]);