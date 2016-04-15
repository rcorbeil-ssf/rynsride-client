angular.module('starter.controllers')
   .controller('RiderReservedRideCtrl', ['$scope', '$state', '$ionicHistory', "RideRequestsService", "getDriverData", "getTripInformation", "$window", "RiderTripDetailsService", "UpdateUser",
        function($scope, $state, $ionicHistory, RideRequestsService, getDriverData, getTripInformation, $window, RiderTripDetailsService, UpdateUser) {
   
            $scope.user = getDriverData;
            $scope.fakeRide = RiderTripDetailsService.currentRide();
            
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
               RideRequestsService.changeState($window.localStorage.token, $window.localStorage.userId, "ended")
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
              RideRequestsService.changeState($window.localStorage.token, $window.localStorage.userId, "ended")
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