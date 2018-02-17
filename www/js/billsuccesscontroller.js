var templateModule=angular.module('billsuccesscontroller', ['ngCordova']);
templateModule.controller('billsuccessCtrl', function($scope, $state, $stateParams,$window,$location) {

  $scope.pay={};
  $scope.pay.operator=$stateParams.operator;
  $scope.pay.number=$stateParams.number;
  $scope.pay.amount=$stateParams.amount;
  $scope.username=$stateParams.uname;
  $scope.goHome=function()
  {
  	$window.location.assign('#/userProfile/' + $scope.username );
      $window.location.reload();
  }
  $scope.goPayment=function()
  {
  	$window.location.assign('#/userProfile/' + $scope.username );
  	$window.location.assign('#/userProfile/' + $scope.username+'/bill/'+$scope.username );
      $window.location.reload();
  }
});



