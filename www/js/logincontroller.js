var templateModule=angular.module('templateLoginController', ['ngCordova',"firebase"]);
templateModule.controller('loginCtrl', function($scope,$cordovaFile,$state,$ionicPopup,$ionicPlatform,$firebaseObject) {
  $scope.loginData={};
    $scope.doRegister=function(){
      $state.go('register');
    }
    $scope.goForget=function(){
        $state.go('forgetpwd');
      }
    $scope.doLogin=function(){
      var ref = firebase.database().ref();
      $scope.data = $firebaseObject(ref);
      $scope.data.$loaded()
        .then(function() {
          if($scope.data[$scope.loginData.username]!=undefined)
          {
            if($scope.data[$scope.loginData.username].password==$scope.loginData.password)
            {
              $ionicPopup.alert({
              title: 'Success',
              template: 'Login Successful'
              });
              $state.go('UserProfile',{name:$scope.loginData.username});
            }
            else
            {
              $ionicPopup.alert({
              title: 'Invalid Password',
              template: 'Username and password doesnot match'
              });
            }
          }
          else
          {
            $ionicPopup.alert({
            title: 'Invalid User Name',
            template: 'User Does Not Exist'
              });
          }
        })
        .catch(function(err) {
          console.error(err);
        });
        
      }
  
});