var app = angular.module('templateAtmController', []);

app.controller('atmCtrl', function($scope, $ionicModal,$state, $stateParams, $window,$location) {

    $scope.atmarr = [];
    var directionsDisplay;
    var directionsService;
    var map;
    var service;
    var atms = [];
    var start;
    var end;
    var flag = 0;


    function calcRoute() {
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(start);
        bounds.extend(end);
        map.fitBounds(bounds);
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
            } else {
                alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
            }
        });
    }

    function onSuccess(position) {

        start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        if (flag == 0) {
            flag = 1;
            map = new google.maps.Map(document.getElementById('map'), {
                center: start,
                zoom: 15,
                draggable: true
            });

            directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

            service = new google.maps.places.PlacesService(map);
        }
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }



    function initMap() {

        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
            timeout: 30000
        });

    }


    function onDeviceReady() {
        initMap();
    }
    document.addEventListener("deviceready", onDeviceReady, false);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                $scope.atmarr.push({
                    'name': results[i].name
                });
                atms.push(results[i]);
            }
            $scope.$apply();
        }
    }


    $scope.update = function(rad) {

        $scope.atmarr.length = 0;
        atms.length=0;
        service.nearbySearch({
            location: start,
            radius: parseInt(rad),
            type: ['atm']
        }, callback);
    }



    $scope.draw = function(index) {
        end = atms[index].geometry.location;
        calcRoute();
        $scope.modal.hide();

    }

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
    });


$scope.goHome = function(){
$window.location.assign('#/userProfile/' + $stateParams.uname );
      $window.location.reload();
  }

});