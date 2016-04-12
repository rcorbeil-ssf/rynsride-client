angular.module('starter.controllers')
    .controller('RiderPendingRideCtrl', ['$scope', '$state', '$ionicHistory', "UpdateUser", "SSFTranslateService", "RiderTripDetailsService",
        function($scope, $state, $ionicHistory, UpdateUser, SSFTranslateService, RiderTripDetailsService) {

          
            $scope.tripDetails = RiderTripDetailsService.currentRide();
            
            $scope.cancel = function() {
                UpdateUser.changeState({
                        state: "canceled"
                    })
                    .then(function(res) {
                        if (res.status === 200) {
                            $state.go("rider");
                        }
                        else {
                            //Handle what happens if there's an error
                        }
                    });
            };
        }
    ]);