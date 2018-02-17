var templateModule = angular.module('templateRegisterController', ['ngCordova',"firebase"]);
templateModule.controller('registerCtrl', function($scope, $state, $ionicPopup,$cordovaFile,$ionicPlatform,$firebaseObject) {
   $scope.registerData={};
   $scope.registerData2={};
  $scope.registerData.securityQuestion="What primary school did you attend?";
  $scope.check=function()
  {
    if($scope.registerData.password!=$scope.registerData2.confirmPassword)
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
  $scope.doRegister=function(rd,mForm){
 
    if( rd==undefined||rd.name==undefined||rd.accountNum==undefined||rd.email==undefined||rd.phone==undefined||rd.userName==undefined||rd.password==undefined||$scope.registerData2.confirmPassword==undefined||rd.answer==undefined||rd.answer=="")
    {
      emptyPopup();
    }
    else if($scope.match||mForm.aname.$error.pattern||mForm.anum.$error.pattern||mForm.phone.$error.pattern||mForm.uname.$error.pattern||mForm.pass.$error.pattern||mForm.pass1.$error.pattern)
    {
      invalidPopup();
    }
    else
    {
      var ref = firebase.database().ref();
      var userRef = firebase.database().ref() +rd.userName;
      $scope.data = $firebaseObject(ref);
      $scope.data.$loaded()
        .then(function() {
          if($scope.data[rd.userName]==undefined)
          {   
            var newUser={};
            newUser[rd.userName]=rd;
              ref.update(newUser);
              var account=rd;
              delete account.password;
              delete account.securityQuestion;
              delete account.answer;
              delete account.password;
              var userDetails={};
              userDetails.balance=10000;
              userDetails.account=account;
              userRef.update(userDetails);
              $ionicPopup.alert({
                title: 'Success!',
                template: 'Account created successfully'
                  });
              $state.go('login');
          }
          else
          {
                $ionicPopup.alert({
                title: 'Username Not Available',
                template: 'Username already exist please choose another user name'
                  });
          }
        })
        .catch(function(err) {
          console.error(err);
        });
              
    }
    
  }
});