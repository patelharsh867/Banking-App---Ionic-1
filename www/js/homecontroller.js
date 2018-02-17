var templateModule=angular.module('templateHomeController', ['ngCordova',"firebase"]);
templateModule.controller('homeCtrl', function($ionicLoading,$scope,$ionicPlatform,$cordovaFile, $state, $ionicPopup, $stateParams, $ionicHistory,$window ,$location,$ionicPlatform,$firebaseObject) {
    $scope.homeData={};
    $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
     var userRef= firebase.database().ref();
     $scope.data = $firebaseObject(userRef);
     $scope.data.$loaded()
        .then(function() {
          $ionicLoading.hide()
          $scope.homeData.accountname=$scope.data.account.name;
          $scope.homeData.accountnum=$scope.data.account.accountNum;
          $scope.homeData.email=$scope.data["account"].email;
          $scope.homeData.phone=$scope.data["account"].phone;
          $scope.homeData.balance=$scope.data["balance"];
        })
        .catch(function(err) {
          console.error(err);
        });

      $scope.goBack = function(){
    $ionicHistory.goBack();
  }    

$scope.curr = function(){
      // alert("redirected");
      // $state.go('UserProfile.forex');
}


 $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="login"){
      navigator.app.exitApp();
    }
    if($state.current.name=="forgetpwd"){
      navigator.app.exitApp();
    }
    if($state.current.name=="register")
    {
      navigator.app.exitApp();
    }
  if($state.current.name=="UserProfile.forex")
    {
      $window.location.assign('#/userProfile/' + $scope.username );
      $window.location.reload();
    }
    if($state.current.name=="UserProfile.emi")
    {
      $window.location.assign('#/userProfile/' + $scope.username );
      $window.location.reload();
    }
    if($state.current.name=="UserProfile.fund")
    {
      $window.location.assign('#/userProfile/' + $scope.username );
      $window.location.reload();
    }
    if($state.current.name=="UserProfile.bill")
    {
      $window.location.assign('#/userProfile/' + $scope.username );
      $window.location.reload();
    }
  if($state.current.name=="UserProfile.list")
    {
      $window.location.assign('#/userProfile/' + $scope.username );
      $window.location.reload();
    }
    if($state.current.name=="UserProfile.tabs")
    {
      $window.location.assign('#/userProfile/' + $scope.username );
      $window.location.reload();
    }
      if($state.current.name=="UserProfile.changepwd")
    {
      $window.location.assign('#/userProfile/' + $scope.username );
      $window.location.reload();
    }
    if($state.current.name=="UserProfile.myaccount")
    {
      $window.location.assign('#/userProfile/' + $scope.username );
      $window.location.reload();
    }
    if($state.current.name=="billsuccess")
    {
          $window.location.assign('#/userProfile/' + $scope.username );
          $window.location.reload();
    }
     if($state.current.name=="register")
    {
      $window.location.assign('#/login' );
      $window.location.reload();
    }
      if($state.current.name=="forgetpwd")
    {
      $window.location.assign('#/login' );
      $window.location.reload();
    }
    else 
    {

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
  

  }, 100);



});