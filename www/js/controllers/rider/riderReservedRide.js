angular.module('starter.controllers')
    .controller('RiderReservedRideCtrl', ['$scope', '$state', '$ionicHistory', "UpdateUser", "getDriverData", "getTripInformation", "RiderTripDetailsService",
        function($scope, $state, $ionicHistory, UpdateUser, getDriverData, getTripInformation, RiderTripDetailsService) {
            $scope.user = getDriverData;
            // $scope.fakeRide = getTripInformation;
            
            
            $scope.fakeRide = RiderTripDetailsService.currentRide();
            
            
            $scope.cancel = function() {
                UpdateUser.changeState({
                        state: "canceled"
                    })
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
                UpdateUser.changeState({
                        state: "canceled"
                    })
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
                UpdateUser.changeState({
                        state: "finished"
                    })
                    .then(function(res) {
                        if (res.status === 200) {
                            $state.go("riderRating");
                        }
                        else {
                            //Need to handle an error 
                        }
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
    
    .directive('toggle1', function () {
        return {
            restrict:'C',
            link: function (scope, element, attrs) {
    
                scope.toggle1Click = function(){
                    element.slideToggle();
                };
            }                  
        };
    })
    
    .directive('toggle2', function () {
        return {
            restrict:'C',
            link: function (scope, element, attrs) {
    
                scope.toggle2Click = function(){
                    element.slideToggle();
                };
                
            }                  
        };
    });