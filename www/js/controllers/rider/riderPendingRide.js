angular.module('starter.controllers')
    .controller('RiderPendingRideCtrl', ['$scope', '$state', '$ionicHistory', "RideRequestsService", "SSFTranslateService",  "PostedTripsService","$window","TripServices",
        function($scope, $state, $ionicHistory, RideRequestsService, SSFTranslateService,  PostedTripsService, $window, TripServices) {
          
            $scope.tripDetails = TripServices.currentTrip();
            $scope.pendingRiderCommitInfo = PostedTripsService.getTrip($window.localStorage.token, $scope.tripDetails.data.id);
           
            $scope.cancel = function() {
                RideRequestsService.changeState($window.localStorage.token, $scope.tripDetails.id, "canceled")
                    .then(function(res) {

                            if (res.status === 200) {
                                $state.go("rider");
                            }
                            else{
                                //Handle what happens if there's an error
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
   
