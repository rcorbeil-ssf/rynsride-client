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
            }]);