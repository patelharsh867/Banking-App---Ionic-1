var templateModule = angular.module('templateProfileController', ['ngCordova']);
templateModule.controller('userProfileCtrl', function($scope, $cordovaImagePicker, $stateParams, $state, $ionicPopup,$cordovaFile) {
  // console.log($stateParams);
  $scope.username = $stateParams.name;


  $state.go('UserProfile.home');

  $scope.doLogout = function() {
    $ionicPopup.confirm({
      title: 'Logout!',
      template: 'Are you sure you want to Logout '
    }).then(function(res) {
      if (res) {
        $state.go('login');
      } else {

      }

    });
  }

  $scope.goforex = function() {
    $state.go('UserProfile.posts');
  }

  $scope.deleteAccount=function(){
        $ionicPopup.confirm({
          title: 'Delete Account!',
          template: 'Are you sure you want to Delete Account '
        }).then(function(res) {
          if (res) {
            var ref = firebase.database().ref() +$scope.username;
            var userRef= firebase.database().ref() +$scope.username;
            ref.remove();
            userRef.remove();
            $state.go('login');
          } else {


          }

        });

  }
});