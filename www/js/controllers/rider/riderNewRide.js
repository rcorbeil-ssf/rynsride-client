angular.module('starter.controllers')
    .controller('RiderNewRideCtrl', ['$scope', '$state', '$ionicHistory', "UpdateUser", "RiderTripDetailsService",
        function($scope, $state, $ionicHistory, UpdateUser, RiderTripDetailsService) {

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
            $scope.toggle1 = function() {
                $scope.toggleA ^= true; 
            };
        }
    ])
    
    .directive('toggle1', function () {
        return {
            restrict:'C',
            link: function (scope, element, attrs) {
    
                scope.toggle1Click = function(){
                    element.slideToggle();
                };
            }                  
        };
    });