angular.module('starter.controllers')
    .controller('RiderReservedRideCtrl', ['$scope', '$state', '$ionicHistory', "RideRequestsService", "$window", "RiderTripDetailsService", "TripServices", "getDriverInfo", "PostedTripsService", "MatchesService",
        function($scope, $state, $ionicHistory, RideRequestsService, $window, RiderTripDetailsService, TripServices, getDriverInfo, PostedTripsService, MatchesService) {

            $scope.tripDetails = TripServices.currentTrip();
            $scope.information = getDriverInfo;
            //   $scope.vehicleInfo = getVehicleInfo;


            $scope.cancel = function() {
                // need to set state to cancelled
            };
            $scope.driverNoShow = function() {
                //need to set state to cancelled
            };
            /*3. When finished ride clicked on it will take them to the driver rating page*/

            $scope.finish = function() {
                RideRequestsService.changeState($window.localStorage.token, $scope.information.id, "reserved")
                    .then(function(res) {
                        return res.data;
                    });

                MatchesService.getMatchedId($window.localStorage.token, $scope.information.id, $scope.tripDetails.id)
                    .then(function(res) {
                        return res.data[0];
                    }).then(function(response) {
                        MatchesService.changeState($window.localStorage.token, response.id, "reserved")
                            .then(function(check) {
                                if (check.status === 200) {
                                    $state.go("driver");
                                }
                                else {
                                    //Handle what happens if there's an error
                                }
                            });
                    });

            };


            $scope.toggle1 = function() {
                $scope.toggleA ^= true;
            };
            $scope.toggle2 = function() {
                $scope.toggleB ^= true;
            };
        }
    ])

.directive('toggle1', function() {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {

            scope.toggle1Click = function() {
                element.slideToggle();
            };
        }
    };
})

.directive('toggle2', function() {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {

            scope.toggle2Click = function() {
                element.slideToggle();
            };

        }
    };
});