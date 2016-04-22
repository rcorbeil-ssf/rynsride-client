angular.module('starter.controllers')
    .controller('DriverReservedRideCtrl', ['$scope', '$rootScope', '$state', '$ionicPopover', '$window', 'PostedTripsService', 'SSFTranslateService', 'committedRiders', 'TripServices', 'RideRequestsService', 'currentTrip',
        function($scope, $rootScope, $state, $ionicPopover, $window, PostedTripsService, SSFTranslateService, committedRiders, TripServices, RideRequestsService, currentTrip) {
            //The trip details will be filled with the trip data from the backend.
            $ionicPopover.fromTemplateUrl('templates/popups/driverReservedPopup.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });
            
            $scope.user = committedRiders;

            $scope.tripDetails = currentTrip;

            $scope.tripUpdate = function(state) {
                var tempData = {
                    state: state
                };
                $scope.state = tempData;
                if (state == 'started') {
                    SSFTranslateService.showConfirm('DRIVER_RESERVED_RIDE.CANCEL.WARNING', 'DRIVER_RESERVED_RIDE.CANCEL.QUESTION')
                        .then(function(res) {
                            if (res == true) {
                                updateConfirmed(tempData);
                            }
                            else {

                            }
                        });
                }
                else if (state == 'canceled') {
                    SSFTranslateService.showConfirm('DRIVER_RESERVED_RIDE.CANCEL.WARNING', 'DRIVER_RESERVED_RIDE.CANCEL.PROMPT')
                        .then(function(res) {
                            if (res == true) {
                                updateConfirmed(tempData);
                                $state.go('driver', {}, {
                                    reload: true
                                });
                            }
                            else {

                            }

                        });
                }
                else if (state == 'ended') {
                    SSFTranslateService.showConfirm('DRIVER_RESERVED_RIDE.CANCEL.WARNING', 'DRIVER_RESERVED_RIDE.CANCEL.QUESTION')
                        .then(function(res) {
                            if (res == true) {
                                updateConfirmed(tempData);
                                RideRequestsService.rateUser(committedRiders);
                                $state.go("riderRating");
                            }
                            else {

                            }
                        });
                }
            };

            function updateConfirmed(newData) {
                PostedTripsService.updateTrip($window.localStorage.token, $scope.tripDetails.id, newData)
                    .then(function(response) {
                        if (response.status == 200) {
                            console.log(response);
                        }
                        else {

                        }
                    });
            }

            $scope.displayRidersUniqueInfo = function($event, riders) {
                $scope.ridersPopupInfo = riders;
                return $scope.openPopover($event);
            };

            $scope.openPopover = function($event) {
                $scope.popover.show($event);

            };
            $scope.closePopover = function() {
                $scope.popover.hide();
            };

            $scope.rateMe = function(ridersPopupInfo) {
                RideRequestsService.rateUser(ridersPopupInfo);
                $state.go('riderRating', {}, {
                    reload: true
                });
            };

            $scope.rideComplete = function() {
                $scope.tripDetails.rideActive = false;
                $scope.tripDetails.state = "ended";
                for (var i = 0; i <= $scope.committedRiders.length - 1; i++) {
                    $scope.committedRiders[i].state = "ended";
                }
                $state.go('riderRating', {}, {
                    reload: true
                });
            };

            $scope.toggle1 = function() {
                $scope.toggleA ^= true;
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