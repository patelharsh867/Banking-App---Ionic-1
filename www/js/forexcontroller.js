var templateModule=angular.module('templateForexController',['nvd3']);
templateModule.controller('forexCtrl', function($scope,$http,$state,$timeout,$ionicPopup) {
   
  $scope.forex={};
  $scope.forex.base="INR";
  $scope.forex.convertTo="USD";
 
$scope.forex.calculate = function(){
console.log('called');
var result=[];
var k=1;


for(var i=1;i<23;i++)


{
$http({
      method: 'GET',
      url: 'http://api.fixer.io/2016-08-0' + i ,
     
          })
    .then(function successCallback(response) {
          fx.rates = response.data.rates;
          rate = fx($scope.forex.input).from($scope.forex.base).to($scope.forex.convertTo);
                    $scope.forex.result=rate.toFixed(4);

          result[k] = rate.toFixed(8);
         // console.log($scope.forex.input);
         console.log(result[k]);
            k++;
        
          }, function errorCallback(response) {
             
          });  
}
  $timeout(function () {
           $scope.forex.data = sinAndCos();
 console.log(result[k]);
  }, 1000);


  
  $scope.forex.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Date',
                    tickFormat:function(d) { 
                    return d3.time.format('%b %d')(new Date(d)); }
                },
                yAxis: {
                    axisLabel: 'Price',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Currency Rate Graph'
            },
          
         
        };

function days(num) {
  return num*60*60*1000*24
}
        /*Random Data Generator */
        function sinAndCos() {
            var sin = [],
                cos = [];
                
        var start_date = new Date() - days(365);
      

            //Data is represented as an array of {x,y} pairs.
            for (var i = 1; i < 23; i++) {
                sin.push({x: new Date(start_date + days(i-22)), y: result[i]});
               
            }

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: sin,      //values - represents the array of {x,y} data points
                    key: 'Currency Change', //key  - the name of the series.
                    color: '#3FB0F4',  //color - optional: choose your own line color.
                    strokeWidth: 1,
                    area:false
                },
            
              
            ];
        };
}
});
	
	

