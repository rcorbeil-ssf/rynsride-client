angular.module('starter.controllers')

.controller('LobbyCtrl', ['$scope', '$rootScope', '$translate', '$state', 'RiderTripDetailsService', "PostedTripsService", "$window", "UsersService", 
    function($scope, $rootScope, $translate, $state, RiderTripDetailsService, PostedTripsService, $window, UsersService) {
        
        $scope.tripDetails = function(ride) {
            RiderTripDetailsService.currentTrip(ride);
            $state.go('riderTripDetailsLobby');
        };

        $scope.reloadRides = function(geopoint) {
            // console.log("getHere");
            // console.log(geopoint);
            var token = $window.localStorage.token;
            var userId = $window.localStorage.userId;
            var dateNow = new Date();
            console.log(dateNow);
            console.log(dateNow.getTime());
            var timeZoneOffset = dateNow.getTimezoneOffset();
            var timeNow = dateNow.getTime();

            PostedTripsService.getLocalTrips(token, geopoint, userId, timeZoneOffset, timeNow)
                .then(function(res) {
                    if(res.data != undefined && res.status == 200){
                        $scope.rides = res.data;
                
                        async.forEachOf(res.data, function (k, indexNum, next){
                            // get driver details
                            UsersService.getUserInfo(k.driverId, $window.localStorage.token)
                                .then(function(response) {
                                    if(response.status == 200){
                                        $scope.rides[indexNum].firstName = response.data.firstName;
                                    }
                                    next();
                            });
                        },function(err){
                            if(err){
                        		var error = new Error('async.forEach operation failed');
                        	} 
                        });
                    }
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