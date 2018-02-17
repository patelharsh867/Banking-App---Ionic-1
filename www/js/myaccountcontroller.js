var templateModule=angular.module('templateMyaccountControllers', ["firebase"]);
templateModule.controller('myAccountCtrl', function($scope,$ionicPopup,$cordovaFile,$firebaseObject) {


  $scope.registerData={};
  var path="default";
    var jsonData={};
    var userRef= firebase.database().ref() + $scope.username;
     $scope.data = $firebaseObject(userRef);
     $scope.data.$loaded()
        .then(function() {
          $scope.registerData.name=$scope.data["account"].name;
          $scope.registerData.accountNum=$scope.data["account"].accountNum;
          $scope.registerData.email=$scope.data["account"].email;
          $scope.registerData.phone=$scope.data["account"].phone;
          $scope.registerData.userName=$scope.data["account"].userName;
        })
        .catch(function(err) {
          console.error(err);
        });
    $scope.doUpdate=function()
    {
      userAccount=userRef.child("account");
      var updatedDetails={};
      updatedDetails.email=$scope.registerData.email;
      updatedDetails.phone=$scope.registerData.phone;
      userAccount.update(updatedDetails);
       $ionicPopup.alert({
            title: 'Success!',
            template: 'Details Updated Successfully'
        });
      

    }
});