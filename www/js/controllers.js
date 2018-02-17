var templateModule=angular.module('templateControllers', ['ngCordova']);
templateModule.controller('homeCtrl', function($scope) {
 $scope.products = ["Milk", "Bread", "Cheese"];
 $scope.items={};
    $scope.addItem = function () {
        $scope.errortext = "";
        if (!$scope.items.addMe) {return;}
        if ($scope.products.indexOf($scope.items.addMe) == -1) {
            $scope.products.push($scope.items.addMe);
        } else {
            $scope.errortext = "The item is already in your shopping list.";
        }
        $scope.items.addMe="";
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.products.splice(x, 1);
    }
});
templateModule.controller('loginCtrl', function($scope,$http,$state,$ionicPopup) {
  $scope.loginData={};
  $scope.doLogin = function() {
    // $http.get("js/data.json")
    // .success(function(data, status, headers,config){
    //   for(var i=0;i<data.length;i++)
    //   {
    //     if($scope.loginData.username==data[i].userName&&$scope.loginData.password==data[i].password)
    //     {
    //       $state.go('UserProfile',{name:$scope.loginData.username});
    //       break;
    //     }
    //     else
    //     {
          
    //     }
    //   } 
    // })
    // .error(function(data, status, headers,config){
    //   alert("failed to fetch json data");
    // })
    // .then(function(result){
    // });
    var data=JSON.parse(localStorage.getItem('usersData'));
    
    if(data[$scope.loginData.username]!=undefined)
    {
      var udata=JSON.parse(data[$scope.loginData.username]);
      if(udata.password==$scope.loginData.password)
      {
        $state.go('UserProfile',{name:$scope.loginData.username});
      }
      else
      {
        alert("invalid password");
      }
    }
    
  };
  $scope.doRegister = function() {
    
   $state.go('register');
  };
});
templateModule.controller('userProfileCtrl', function($scope,$cordovaImagePicker,$stateParams,$state,$ionicPopup) {
  $scope.img_url="img/user.png";
  // console.log($stateParams);
  $scope.username=$stateParams.name;
  $scope.imagePicker = function() {
  //   var options = {
  //  maximumImagesCount: 10,
  //  width: 800,
  //  height: 800,
  //  quality: 80
  // };

  // $cordovaImagePicker.getPictures(options)
  //   .then(function (results) {
  //     $scope.img_url=results[0];

  //   }, function(error) {
  //     alert("failed to get picture error : "+error);
  //   });
    navigator.camera.getPicture(function(imageData) {
      $scope.$apply(function(){
        $scope.img_url="data:image/jpeg;base64," + imageData;
      });
    }, function(message) {
      $scope.$apply(function(){
        alert('Failed because: ' + message);
      });
    }, { quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM 
    });
  };
  $state.go('UserProfile.home');
  $scope.doLogout=function(){
    $ionicPopup.confirm({
            title: 'Logout!',
            template: 'Are you sure you want to Logout '
        }).then(function(res) {
          if(res)
          {
            $state.go('login');
           }
          else
          {

          }
         
        });
  }
  
});
templateModule.controller('registerCtrl', function($scope,$state,$ionicPopup) {
  $scope.registerData={};
  $scope.doRegister=function(){
      // JSON.stringify($scope.registerData);
     if(localStorage.getItem('usersData')==null)
     {
      var data={};
      data[$scope.registerData.userName]=JSON.stringify($scope.registerData);
      localStorage.setItem('usersData', JSON.stringify(data));
     }
     else
     {
      var data=JSON.parse(localStorage.getItem('usersData'));
      if(data[$scope.registerData.userName]==undefined)
      {
        data[$scope.registerData.userName]=JSON.stringify($scope.registerData);
        localStorage.setItem('usersData', JSON.stringify(data));
        $ionicPopup.alert({
            title: 'Success!',
            template: 'Account created successfully'
        }).then(function(res) {
          
         $state.go('UserProfile',{name:$scope.registerData.userName});
        });
        
      }
      else
      {
        $ionicPopup.alert({
            title: 'Username Not Available',
            template: 'Username already exist please choose another user name'
        }).then(function(res) {
          
         
        });
      }
      
     }
      
  }
});
templateModule.controller('myAccountCtrl', function($scope,$stateParams,$ionicPopup) {
  $scope.registerData={};
  $scope.registerData.userName=$stateParams.name;
  var data=JSON.parse(localStorage.getItem('usersData'));
  var udata=JSON.parse(data[$stateParams.name]);
   $scope.registerData.password=udata.password;
    $scope.registerData.email=udata.email;
    $scope.registerData.phone=udata.phone;
    $scope.registerData.firstName=udata.firstName;
    $scope.registerData.lastName=udata.lastName;
  $scope.doUpdate=function(){
        data[$scope.registerData.userName]=JSON.stringify($scope.registerData);
        $ionicPopup.confirm({
            title: 'Update profile!',
            template: 'Are you sure you want to update your profile '
        }).then(function(res) {
          if(res)
          {
            localStorage.setItem('usersData', JSON.stringify(data));
              $ionicPopup.alert({
              title: 'Update profile!',
              template: 'Profile updated succesfully '
              }).then(function(res) {

              });
            }
          else
          {

          }
         
        });
        
      
     }
});