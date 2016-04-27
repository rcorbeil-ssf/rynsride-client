angular.module('starter.controllers')
.controller('DriverPendingTripCtrl', ['$scope', '$state', '$ionicHistory', 'getRiderDetails', "RideRequestsService", "$window", "PostedTripsService", "MatchesService", "RiderTripDetailsService",
    function($scope, $state, $ionicHistory, getRiderDetails, RideRequestsService, $window, PostedTripsService, MatchesService, RiderTripDetailsService) {
        
        $scope.selectedTrip = RiderTripDetailsService.currentRide();
        $scope.pendingRide = getRiderDetails;
        
        $scope.commit = function() {
            $scope.selectedTrip = RiderTripDetailsService.currentRide();
            $scope.pendingRide = getRiderDetails;
        
            RideRequestsService.changeState($window.localStorage.token, $scope.pendingRide.id, "reserved")
                .then(function(res) {
                    return res.data;
                });
            PostedTripsService.changeState($window.localStorage.token, $scope.selectedTrip.id, "reserved")
                .then(function(res) {
                    return res.data;
                });

            MatchesService.getMatchedId($window.localStorage.token, $scope.pendingRide.id, $scope.selectedTrip.id)
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

// Driver Pending Trip page
// 	1) Upon entering this page the controller must make a request of the RideService to retrieve
// 	   information regarding the pending rider as well as the pending ride request.
// 	2) It will display this info in cards.
// 	3) If 'Accept Rider' is clicked, the controller pairs the matched rideRequest to the trip in 
// 	   the RideService and goes to the Trip Details page.
// 	   If 'Decline Rider' is clicked, the controller changes the state of the rideRequest from 
//     pending to matched in the RideService and goes to the Driver page.
// 	4) If a tab is clicked we go to the appropriate page.