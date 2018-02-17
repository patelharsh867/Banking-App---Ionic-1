var templateModule=angular.module('templateContactController', []);
templateModule.controller('contactCtrl', function($scope,$http,$state,$timeout,$ionicPopup) {
    
    
// alert("in");
// function myMap() 
// {
//   var mapCanvas = document.getElementById("map");
//   var mapOptions = {
//     center: new google.maps.LatLng(8.5531, 76.8802),
//     zoom: 15
//   }
//   var map = new google.maps.Map(mapCanvas, mapOptions);
// }
//     myMap();

// 




function myMap() {
  var mapCanvas = document.getElementById("map");
  var myCenter = new google.maps.LatLng(8.5531, 76.8802);
  var mapProp = {center: myCenter, zoom: 15};
  var map = new google.maps.Map(mapCanvas,mapProp);
  var marker = new google.maps.Marker({
    position: myCenter,
    animation: google.maps.Animation.BOUNCE
  });
  marker.setMap(map);
}

 myMap();

 });