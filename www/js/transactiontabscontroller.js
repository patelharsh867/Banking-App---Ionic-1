var templateModule=angular.module('transactioncontroller', ['ngCordova',"firebase"]);
templateModule.controller('transactionCtrl', function($scope, $state, $stateParams, $cordovaFile, $ionicPopup,$timeout, $ionicPopover,$firebaseObject) {
 $scope.name=$stateParams.name;
var obj=[];
  var str=[];
  var file = $scope.name+".json";
  var ref = firebase.database().ref() +$scope.username;
  $scope.data = $firebaseObject(ref);
  $scope.data.$loaded()
          .then(function() {
            if($scope.data['tran']==undefined)
            {
              obj=[];
            }
            else{
              obj=$scope.array=$scope.data['tran'];
            }
              
             
          })
          .catch(function(err) {
            console.error(err);
          });
  $scope.mark = function(index,event){
    event.stopPropagation();
     $scope.data = $firebaseObject(ref);
    $scope.data.$loaded()
          .then(function() {
            if($scope.data['tran']==undefined)
            {
              obj=[];
            }
            else{
              obj=$scope.array=$scope.data['tran'];
            }
              for(var i=0;i<obj.length;i++)
              {
                if(index.amount==obj[i].amount&&index.description==obj[i].description&&index.effectiveDate==obj[i].effectiveDate&&index.id==obj[i].id&&index.number==obj[i].number)
                {
                  var ind=i;
                  break;
                }
              }
            obj[ind].marked=!obj[ind].marked;
            $scope.array=obj;
            var updateRef=ref.child("tran");
                  updateRef.update(obj);
             
          })
          .catch(function(err) {
            console.error(err);
          });
     
  }
  
  $scope.detail = function(index,event){
     for(var i=0;i<obj.length;i++)
              {
                if(index.amount==obj[i].amount&&index.description==obj[i].description&&index.effectiveDate==obj[i].effectiveDate&&index.id==obj[i].id&&index.number==obj[i].number)
                {
                  var ind=i;
                  break;
                }
              }
    $scope.tran=obj[ind];
    $ionicPopover.fromTemplateUrl('templates/transactionpopup.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
    $scope.popover.show(event);
  }

    
});



