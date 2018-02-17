var templateModule=angular.module('templateForexController', []);
templateModule.controller('forexCtrl', function($scope,$http,$state,$timeout,$ionicPopup) {
   
  $scope.forex={};
  $scope.forex.base="INR";
  $scope.forex.convertTo="USD";
  // $scope.forex.input=1;
  $scope.forex.calculate=function(){
    $http({
      method: 'GET',
      url: 'http://api.fixer.io/latest?base=PHP',
     
          })
    .then(function successCallback(response) {
          fx.rates = response.data.rates;
          var rate = fx($scope.forex.input).from($scope.forex.base).to($scope.forex.convertTo);
          $scope.forex.result=rate.toFixed(4);
          
          if(isNaN($scope.forex.result))
          {
            $scope.forex.result="";
          }
          }, function errorCallback(response) {
              $ionicPopup.alert({
            title: 'Connection Failed',
            template: 'Failed to fetch realtime forex data please check your internet connectivity'
                }).then(function(res) {
          
         
                    });
          });

  };

});
	
	

