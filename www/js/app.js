var appModule=angular.module('myApp', ['ionic','templateController', 'ui.router','ngCordova',"firebase"]);

appModule.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    cache:false,
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  .state('register', {
    url: '/register',
    cache:false,
    templateUrl: 'templates/register.html',
     controller: 'registerCtrl'
  })
  .state('forgetpwd', {
    url: '/forgetpwd',
    cache:false,
    templateUrl: 'templates/password.html',
    controller: 'forgetpwdCtrl'
  })
  .state('billsuccess', {
    url: '/billsuccess',
    cache:false,
    templateUrl: 'templates/billsuccess.html',
    params: {
       operator : null,
        amount: null,
        number:null,
        uname:null
      },
      controller: 'billsuccessCtrl'
    
  })
  .state('UserProfile', {
    url: '/userProfile/:name',
    cache:false,
    templateUrl: 'templates/userProfile.html',
     controller: 'userProfileCtrl'
  })
  .state('UserProfile.myaccount', {
    url: '/myaccount',
     cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/myaccount.html',
        controller:'myAccountCtrl'
      }
    }

  })
  .state('UserProfile.home', {
    url: '/home',
     cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller:'homeCtrl'
      }
    }

  })
  .state('UserProfile.changepwd', {
    url: '/changePassword',
     cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/changepassword.html',
        controller:'changepwdCtrl'
      }
    }
  })
  .state('UserProfile.posts', {
    url: '/posts',
    views: {
      'menuContent': {
        templateUrl: 'templates/posts.html'
      }
    }
  })
   .state('UserProfile.emi', {
    url: '/emi',
     cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/emi.html',
        controller:'emiCtrl'
       
      }
    }
  })




  .state('UserProfile.transaction', {
    url: '/transaction',
    views: {
      'menuContent': {
        templateUrl: 'templates/transaction.html',
       
      }
    }
  })
     .state('UserProfile.contactus', {
    url: '/contactus',
     cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/contactus.html',
        controller:'contactCtrl'
       
      }
    }
  })
  
  .state('atm', {
    url: '/atm/:uname',
     cache:false,
    
        templateUrl: 'templates/atm.html',
        controller:'atmCtrl'
       
      
    
  })

  .state('UserProfile.forex', {
    url: '/forex',
     cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/forex.html',
        controller:'forexCtrl'
       
      }
    }
  })
  .state('UserProfile.bill', {
      url: '/bill/:uname',
      views: {
        'menuContent': {
          templateUrl: 'templates/billpayment.html',
          controller:'billpayCtrl'
         
        }
      }
    })
  .state('UserProfile.tabs', {
      url: '/tabs/:uname',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/transactiontabs.html',
          controller:'transactionCtrl'
         
        }
      }
    })
  .state('UserProfile.deleteaccount', {
    url: '/deleteaccount',
    views: {
      'menuContent': {
        templateUrl: 'templates/deleteaccount.html',
       
      }
    }
  })
.state('UserProfile.fund', {
      url: '/fund/:uname',
        views: {
      'menuContent': {
        templateUrl: 'templates/fund.html',
        controller:'fundCtrl'
       
      }
    },
    cache:false

})
  .state('UserProfile.list', {
      url: '/ben/:name',
          views: {
      'menuContent': {
        templateUrl: 'subHTML/list.html',
        controller:'ListCtrl'
       
      }
    },
    cache:false
    })

    .state('UserProfile.edit', {
      url: '/edit',
               views: {
      'menuContent': {
        templateUrl: 'subHTML/edit.html',
        controller:'EditCtrl'
       
      }
      },
      params: {
        index: null,
        uname: null

      }
    })

    .state('UserProfile.add', {
      url: '/add',
              views: {
      'menuContent': {
        templateUrl: 'subHTML/add.html',
        controller:'addCtrl'
       
      }
      },
      params: {
        uname: null
      }
      
    })

     

   $urlRouterProvider.otherwise('login');
});

appModule.controller('ListCtrl', function($scope, $state, $cordovaFile,$stateParams,$firebaseObject) {
  var ref = new Firebase("https://banking-app-46657.firebaseio.com/"+$scope.username);
  
  // alert("list controller");
  var path,file;
  // alert($stateParams.name);
  $scope.data = $firebaseObject(ref);
          $scope.data.$loaded()
          .then(function() {
            if($scope.data['ben']==undefined)
            {
             obj=$scope.array=[];
            }
            else
            {
              obj=$scope.array=$scope.data['ben'];
            }
          })
          .catch(function(err) {
            console.error(err);
          });
  $scope.changePage = function(){
    $state.go('UserProfile.add',{'uname':$stateParams.name});
  }
  $scope.edit = function(index){
    for(var i=0;i<obj.length;i++)
              {
                if(index.name==obj[i].name)
                {
                  var ind=i;
                  break;
                }
              }
    $state.go('UserProfile.edit', {'index':ind,'uname':$stateParams.name});
  }
  $scope.delete = function(index){
//    alert(file);
    $scope.data = $firebaseObject(ref);
          $scope.data.$loaded()
          .then(function() {
            
              obj=$scope.array=$scope.data['ben'];
              for(var i=0;i<obj.length;i++)
              {
                if(index.name==obj[i].name)
                {
                  var ind=i;
                  break;
                }
              }
              delete index.$$hashKey;
              console.log(index);
              console.log(ind);
              console.log(obj);
              obj.splice(ind,1);
              $scope.array=obj;
              var updatedData={};
              updatedData.ben=obj;
              ref.update(updatedData);
            
          })
          .catch(function(err) {
            console.error(err);
          });
    
  }
  $scope.detail = function(index){
    alert("detail");
  }
    
});
 
appModule.controller('addCtrl', function($scope, $state, $stateParams, $ionicHistory, $cordovaFile, $ionicPopup,$firebaseObject){
  var ref = new Firebase("https://banking-app-46657.firebaseio.com/"+$scope.username);
  $scope.data = $firebaseObject(ref);
          $scope.data.$loaded()
          .then(function() {
             obj=$scope.data['ben'];
          })
          .catch(function(err) {
            console.error(err);
          });

  
  var arr,path;
  // alert($stateParams.uname);
  var file=$stateParams.uname + ".json";
  function invalidPopup(){
  var invalid = $ionicPopup.alert({
         title: 'Format Error',
         template: 'Resolve all errors before proceeding!'
      })
  }
  function emptyPopup(){
  var empty = $ionicPopup.alert({
         title: 'Empty field',
         template: 'One or more fields empty.'
      })
  }
  function preadd(){
  var added = $ionicPopup.alert({
         title: 'Error',
         template: 'Beneficiary already added.'
      })
  }

  $scope.add = function(ben,myForm){
    if(obj==undefined)
    {
      obj=[];
    }
    if(ben==undefined||ben.name==undefined||ben.accno==undefined||ben.accno2==undefined||ben.ifsc==undefined)
    {
      emptyPopup();
      return;
    }

    if(myForm.acc1.$error.pattern||myForm.bname.$error.pattern||myForm.acc2.$error.pattern||myForm.ifsc.$error.pattern||$scope.match)
    {
      invalidPopup();
      return;
    }

    for(var i=0;i<obj.length;i++)
    {
      if(ben.name==obj[i].name&&ben.accno==obj[i].accno&&ben.accno2==obj[i].accno2&&ben.ifsc==obj[i].ifsc)
      {
        preadd();
        return;
      }
    }
    obj.push(ben);
    var updatedData={};
    updatedData.ben=obj;
    ref.update(updatedData);
    alert("Added Beneficiary");
    $ionicHistory.goBack();
  }

  $scope.check = function(ben){
    if(ben.accno!=ben.accno2)
      $scope.match=true;
    else
      $scope.match=false;
  }
  
});

appModule.controller('EditCtrl', function($scope, $stateParams, $ionicHistory, $cordovaFile, $stateParams, $ionicPopup,$firebaseObject) {
  var ref = new Firebase("https://banking-app-46657.firebaseio.com/"+$scope.username);

  var arr,path;
  var obj = [];
  var file=$stateParams.uname+".json";
  function invalidPopup(){
  var invalid = $ionicPopup.alert({
         title: 'Format Error',
         template: 'Resolve all errors before proceeding!'
      })
  }
  function emptyPopup(){
  var empty = $ionicPopup.alert({
         title: 'Empty field',
         template: 'One or more fields empty.'
      })
  }
  $scope.data = $firebaseObject(ref);
          $scope.data.$loaded()
          .then(function() {
             obj=$scope.data['ben'];
             $scope.ben=obj[$stateParams.index];
          })
          .catch(function(err) {
            console.error(err);
          });
  
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }    

  $scope.save = function(ben,myForm){
    if(ben==undefined||ben.name==undefined||ben.accno==undefined||ben.accno2==undefined||ben.ifsc==undefined)
    {
      emptyPopup();
      return;
    }

    if(myForm.acc1.$error.pattern||myForm.bname.$error.pattern||myForm.acc2.$error.pattern||myForm.ifsc.$error.pattern||$scope.match)
    {
      invalidPopup();
      return;
    }
    
          obj[$stateParams.index]=ben;
          var updateRef=ref.child("ben");
          // var updatedData={};
          // updatedData[$stateParams.index]=ben;
          updateRef.update(obj);
          alert("updated");
              $ionicHistory.goBack();

  }

  $scope.check = function(ben){
    if(ben.accno!=ben.accno2)
      $scope.match=true;
    else
      $scope.match=false;
  }

});


appModule.controller('fundCtrl', function($scope, $state, $stateParams, $ionicHistory, $cordovaFile, $ionicPopup,$timeout,$firebaseObject){
 $scope.tran={
         
         id:'',
         description:'',
         effectiveDate:'',
         amount:''
        
     };
  var ref = new Firebase("https://banking-app-46657.firebaseio.com/"+$scope.username);
  $scope.data = $firebaseObject(ref);
          
  var arr,path;
  var obj = [];
  $scope.benif = [];
  $scope.arr = [];
  var bal;
$scope.data.$loaded()
          .then(function() {
            if($scope.data['tran']==undefined)
            {
              obj=[];
            }
            else{
              obj=$scope.data['tran'];
            }
              bal=$scope.data.balance;
             if($scope.data.ben==undefined)
             {
              $scope.benif=[];
             }
             else
             {
              $scope.benif=$scope.data.ben;
             }
          })
          .catch(function(err) {
            console.error(err);
          });

$scope.populateAcc = function(item){

  for(var i=0;i<$scope.benif.length;i++)
  {
    if(item.name == $scope.benif[i].name)
    {
      $scope.tran.id = $scope.benif[i].accno;
      console.log($scope.benif[i].accno);
      break;
    }
   
  }

}


   $scope.goBack = function(){
    $ionicHistory.goBack();
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
         template: 'Empty or invalid field'
      })
  }

  function reset(tran) {
    
          alert("Transfer Successful");
          tran.id='';
          tran.description='';
          tran.amount='';
  }

var date = new Date();  
$scope.tran.effectiveDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

$scope.addFund = function(tran,fundForm){
    
     if(tran==undefined||tran.id==""||tran.amount==""||tran.amount==NaN||tran.amount==undefined||tran.amount==null)
    {
      emptyPopup();
      return;
    }

    if(tran.amount > bal)
    {
       $ionicPopup.alert({
         title: 'Insufficient balance',
         template: 'You do not have enough balance to proceed'
      })
    }
    else if(tran.amount<100)
    {
      $ionicPopup.alert({
         title: 'Invalid Amount',
         template: 'Minimum amount required is Rs.100'
      })
    }
  else
  {
    bal = bal-tran.amount;
    tran.description = $scope.tran.description.name;
    obj.unshift(tran);
    $scope.arr["tran"]=obj;
    var updateRef=ref.child("tran");
          updateRef.update(obj);
          var balObj={};
          balObj.balance=bal;
          ref.update(balObj);
     $timeout(function () {
           reset(tran);

  }, 1000);

    }
  

  }


  
});


