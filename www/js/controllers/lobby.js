angular.module('starter.controllers')

.controller('LobbyCtrl', ['$scope', '$rootScope', '$translate', '$state', 'RiderTripDetailsService', "PostedTripsService", "$window",
    function($scope, $rootScope, $translate, $state, RiderTripDetailsService, PostedTripsService, $window) {
        
        $scope.tripDetails = function(ride) {
            RiderTripDetailsService.currentTrip(ride);
            $state.go('riderTripDetailsLobby');
        };

        $scope.reloadRides = function(geopoint) {
            // console.log("getHere");
            // console.log(geopoint);
            var token = $window.localStorage.token;
            PostedTripsService.getLocalTrips(geopoint, token)
                .then(function(res) {
                    $scope.rides = res.data;
                });
        };
        $scope.getLocation = function() {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords.latitude, position.coords.longitude);
                var geopoint = {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                };
                $scope.reloadRides(geopoint);
            });
        };
           $scope.getLocation();
    }
]);