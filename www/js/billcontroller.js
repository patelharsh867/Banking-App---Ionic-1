var templateModule=angular.module('billcontroller', ['ngCordova',"firebase"]);
templateModule.controller('billpayCtrl', function($scope, $state, $stateParams, $cordovaFile, $ionicPopup,$timeout,$firebaseObject) {
  $scope.tran={

         effectiveDate:''
        
     };
     var ref = firebase.database().ref() +$scope.username;
     $scope.data = $firebaseObject(ref);
     $scope.mobile={};
     $scope.dth={};
     $scope.broadband={};
  var transactioId={
    "Airtel":"2054786203",
    "Aircel":"1254789653",
    "Tata Docomo":"4587123695",
    "Reliance":"7895412364",
    "Vodaphone":"2547896321",
    "Idea":"2356987424",
    "Bsnl":"6254789562",
    "Dish TV":"4567896321",
    "Tata Sky":"2354789652",
    "Airtel digital TV":"4567891235",
    "Videocon d2h":"2356897415"
  }
  
  var arr,path;
  var obj = [];
  var bal;
  var file=$stateParams.uname +".json";
  var operator;
  $scope.type={};
  $scope.bill={};
  var date = new Date();  
  $scope.tran['effectiveDate'] = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  var ref = firebase.database().ref() + $scope.username;
  $scope.data = $firebaseObject(ref);
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
             
          })
          .catch(function(err) {
            console.error(err);
          });
 
  $scope.showType=function()
  {
    $scope.type.num=true;
    $scope.type.amount=true;
    $scope.type.recharge=true;
    if($scope.bill.type=="Mobile")
    {
      $scope.type.mobile=true;
      $scope.type.broadband=false;
      $scope.type.DTH=false;
      $scope.mobile.operator="Airtel";
    }
    else if($scope.bill.type=="DTH")
    {
       $scope.type.mobile=false;
       $scope.type.broadband=false;
       $scope.type.DTH=true;
       $scope.dth.operator="Dish TV";
    }
    else if($scope.bill.type=="Broadband")
    {
       $scope.type.mobile=false;
       $scope.type.broadband=true;
       $scope.type.DTH=false;
       $scope.broadband.operator="Airtel";
    }
  }
  $scope.payBill=function()
  {
    if($scope.tran.number==undefined||$scope.tran.amount==undefined||$scope.tran.number==""||$scope.tran.amount=="")
    {
        $ionicPopup.alert({
         title: 'Empty field',
         template: 'Empty or invalid fields.'
      });
      
    }
    else
    {
      if(bal<$scope.tran.amount)
    {
      $ionicPopup.alert({
            title: 'Insufficient Balance',
            template: 'You do not have enough balance to make the transaction'
              });
    }
    else if($scope.tran.amount<1)
    {
      $ionicPopup.alert({
         title: 'Invalid Amount',
         template: 'Minimum amount required is Rs.1'
      })
    }
    else
    {
      if($scope.bill.type=="Mobile")
      {
       $scope.tran["id"]=transactioId[$scope.mobile.operator];
       $scope.tran["description"]=$scope.mobile.operator+" bill payment";
       operator=$scope.mobile.operator;
      }
      if($scope.bill.type=="DTH")
      {
        $scope.tran["id"]=transactioId[$scope.dth.operator];
        $scope.tran["description"]=$scope.dth.operator+" "+$scope.bill.type+" bill payment";
        operator=$scope.dth.operator;
      }
      if($scope.bill.type=="Broadband")
      {
        $scope.tran["id"]=transactioId[$scope.broadband.operator];
        $scope.tran["description"]=$scope.broadband.operator+" "+$scope.bill.type+" bill payment";
        operator=$scope.broadband.operator;
      }
      bal=bal-$scope.tran.amount;
      obj.unshift($scope.tran);
      var updateRef=ref.child("tran");
          updateRef.update(obj);
          var balObj={};
          balObj.balance=bal;
          ref.update(balObj);
      $ionicPopup.alert({
            title: 'Success!',
            template: 'Bill Payment is Successful'
              });
      // $timeout(function () {
      //      $scope.tran.amount="";
      //     $scope.tran.number="";
      //     }, 1000);
      $state.go('billsuccess',{'operator':operator,'amount':$scope.tran.amount,'number':$scope.tran.number,'uname':$stateParams.uname});

    }
    }
    

    
  }
  
});



