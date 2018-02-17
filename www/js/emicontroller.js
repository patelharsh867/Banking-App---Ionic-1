var templateModule=angular.module('templateEmiController', []);
templateModule.controller('emiCtrl', function($scope,$http,$state,$timeout,$ionicPopup) {
    
    console.log("in emi");
    
$scope.obj={
    principle:'',
    rate:50,
    duration:'',
    emi:'',
    emiTotal:'',
    mySelect:'Years'
};
    

    
    var timePeriod;
    var durationType;
    durationType = $scope.obj.mySelect;
    $scope.showSelectValue = function(mySelect) {
    
    durationType = $scope.obj.mySelect;
    console.log(durationType);
    }

    $scope.resetFields = function(){

    $scope.obj.principle="";
    $scope.obj.rate="50";
    $scope.obj.duration="";
    $scope.obj.emi="";
    $scope.obj.emiTotal="";
    }

    $scope.calcEmi = function () {
   if($scope.obj.principle==''||$scope.obj.duration=='')
    {
        $ionicPopup.alert({
         title: 'Empty field',
         template: 'One or more fields empty.'
      });
      
    }
    else
    {
    var p = $scope.obj.principle;
    var r = $scope.obj.rate;
    var n = $scope.obj.duration;

    if(durationType == "Years")
    {
       var r = $scope.obj.rate/(12*100);
       var n = $scope.obj.duration * 12 ;
    }
   
   if(durationType == "Months")
    {
      var n = $scope.obj.duration;
      var r = $scope.obj.rate/100;
    }
    console.log(p);
    console.log(r);
    console.log(n);

    var expRate = Math.pow((1+r),n);
    console.log(expRate);

    var numerator = r * expRate;
    var denominator = expRate - 1;
    var amount = (p*numerator)/denominator;
    amount = amount.toFixed(2);
    $scope.obj.emi = (amount*12)/12;
    $scope.obj.emiTotal = amount * n;
    }
    }
    
});

