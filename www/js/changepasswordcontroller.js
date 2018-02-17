var templateModule=angular.module('templateChangepwdController', ['ngCordova',"firebase"]);
templateModule.controller('changepwdCtrl', function($scope,$cordovaFile,$ionicPopup,$state,$firebaseObject) {
     $scope.registerData={};
     var ref = firebase.database().ref() + $scope.username;
     var path="default";
      var jsonData={};
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
      $scope.doChange=function(rd,mForm){
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
          $scope.data = $firebaseObject(ref);
          $scope.data.$loaded()
          .then(function() {
             if($scope.data.password==$scope.registerData.oldPassword)
              { 
                var updatedData={};
                updatedData.password=$scope.registerData.password;
                ref.update(updatedData);
                $ionicPopup.alert({
                  title: 'Success!',
                  template: 'Password changed successfully'
                  }).then(function(res) {
                      $state.go('login');
                  });
                
              }
              else
              {
                 $ionicPopup.alert({
                  title: 'Invalid Old Password',
                  template: 'Please enter valid current password to make changes'
                  });
              }
            
          })
          .catch(function(err) {
            console.error(err);
          });

      }

      }
    

});