var templateModule=angular.module('forgetpwdController', ['ngCordova',"firebase"]);
templateModule.controller('forgetpwdCtrl', function($scope,$cordovaFile,$state,$ionicPopup,$firebaseObject) {
    $scope.registerData={};
    var path="default";
    var jsonData={};
    var ref = firebase.database().ref() + "/users";
    $scope.data = $firebaseObject(ref);
    
    $scope.check=function()
      {
        if($scope.registerData.password!=$scope.registerData.confirmPassword)
        {
          $scope.match=true;
        }
        else
        {
          $scope.match=false;
        }
      }
        function invalidPopup(){
          var invalid = $ionicPopup.alert({
                 title: 'Format Error',
                 template: 'Resolve all errors before proceeding!'
              })
          }
          function emptyPopup(){
          var empty = $ionicPopup.alert({
                 title: 'Empty field',
                 template: 'Empty or invalid fields.'
              })
          }
    $scope.registerData.showquestion=false;
      $scope.registerData.showchanger=false;
      $scope.registerData.showuser=true;
      $scope.dogetUser=function()
      { 
          $scope.data.$loaded()
        .then(function() {
          if($scope.data[$scope.registerData.username]==undefined)
          {   
            $ionicPopup.alert({
            title: 'Invalid User',
            template: 'User Does Not Exist'
          });
          }
          else
          {
                $scope.registerData.showquestion=true;
            $scope.registerData.showuser=false;
            $scope.registerData.securityQuestion=$scope.data[$scope.registerData.username].securityQuestion;
          }
        })
        .catch(function(err) {
          console.error(err);
        });
        
      }
      $scope.doCheck=function()
      {
        $scope.data.$loaded()
        .then(function() {
          if($scope.data[$scope.registerData.username].answer==$scope.registerData.answer)
          {   
            $scope.registerData.showchanger=true;
            $scope.registerData.showquestion=false;
          }
          else
          {
              $ionicPopup.alert({
            title: 'Incorrect',
            template: 'Sorry! Your Answer is Incorrect'
            });
          }
        })
        .catch(function(err) {
          console.error(err);
        });
        
        
      }
      $scope.doChange=function(rd,mForm)
      { 
        if(rd.password==undefined||rd.confirmPassword==undefined){
          emptyPopup();
        }
        
        else if($scope.match||mForm.pass.$error.pattern||mForm.pass1.$error.pattern)
        {
          invalidPopup();
        }
        else if(rd.password!=rd.confirmPassword)
        {
          $ionicPopup.alert({
                 title: 'Password Mismatch',
                 template: 'Reconfirm password!'
              });
        }
        else
        {
          var updateRef=ref.child($scope.registerData.username);
          var updatedObj={};
          updatedObj.password=$scope.registerData.password;
          updateRef.update(updatedObj);
           $ionicPopup.alert({
            title: 'Succcess',
            template: 'password updated successfully'
            });
          $state.go('login');
        
        }
        
      }
});



