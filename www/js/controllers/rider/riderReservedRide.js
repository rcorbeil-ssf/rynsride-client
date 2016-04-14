angular.module('starter.controllers')
    .controller('RiderReservedRideCtrl', ['$scope', '$state', '$ionicHistory', "RideRequestsService", "getDriverData", "getTripInformation", "$window",
        function($scope, $state, $ionicHistory, RideRequestsService, getDriverData, getTripInformation, $window) {
            $scope.user = getDriverData;
            $scope.fakeRide = getTripInformation;
            
            $scope.cancel = function() {
                RideRequestsService.changeState($window.localStorage.token, $window.localStorage.userId, "canceled")
                    .then(function(res) {
                        if (res.status === 200) {
                            $state.go("rider");
                        }
                        else {
                            //Need to handle an error 
                        }
                    });
            };
            $scope.driverNoShow = function() {
               RideRequestsService.changeState($window.localStorage.token, $window.localStorage.userId, "drRated")
                    .then(function(res) {
                        if (res.status === 200) {
                            $state.go("riderRating");
                        }
                        else {
                            //Need to handle an error
                        }
                    });
            };
            /*3. When finished ride clicked on it will take them to the driver rating page*/
            $scope.finish = function() {
              RideRequestsService.changeState($window.localStorage.token, $window.localStorage.userId, "drRated")
                    .then(function(res) {
                        if (res.status === 200) {
                            $state.go("riderRating");
                        }
                        else {
                            //Need to handle an error 
                        }
                    });
            };
        }
    ]);