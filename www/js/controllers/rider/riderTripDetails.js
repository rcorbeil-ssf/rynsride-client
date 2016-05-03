angular.module('starter.controllers')

.controller('RiderTripDetailsCtrl', ['$scope', '$rootScope', '$translate', '$state', 'SSFAlertsService',
    'RiderTripDetailsService', 'RideRequestsService', '$ionicPopover', '$window', "PostedTripsService", "MatchesService",
    function($scope, $rootScope, $translate, $state, SSFAlertsService, RiderTripDetailsService, RideRequestsService, $ionicPopover, $window, PostedTripsService, MatchesService) {

        // When the 'Commit' button is clicked, we go to the Rider page ](Requested Rides)
        
        //lobby 
        $scope.request = function(data) {
            var tripInfo = {
                riderId: $window.localStorage.userId,
                startAddress: data.startAddress,
                startGeopoint: data.startGeopoint,
                destAddress: data.destAddress,
                destGeopoint: data.destGeopoint,
                startDate: data.startDate,
                startTime: data.startTime,
                state: "pending"

            };
            RideRequestsService.postRideData($window.localStorage.token, tripInfo);
            var currentTrip = RiderTripDetailsService.currentTrip();
            PostedTripsService.changeState($window.localStorage.token, currentTrip.id, "pending");
            SSFAlertsService.showAlert('Request made', '');
            $state.go('rider', {}, {reload: true});
        };

        $ionicPopover.fromTemplateUrl('templates/popups/riderTripDetailsContact.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        //     RiderTripDetails page
        // 	   Upon entering this page the controller must get from the TripService the trip in question.
        // 	   It will use this trip info to display the trip details.  To display the user name, age, gender
        // 	   it will need to make a request of the UserService to retrieve this info from the backend.
        //Current trip goes to lobby


        //This is trip from lobby
        $scope.currentTrip = RiderTripDetailsService.currentTrip();
        //Selected trip goes to matched
        $scope.selectedTrip = RiderTripDetailsService.selectedTrip();
        //Selected ride id
        $scope.currentRide = RiderTripDetailsService.currentRide();

        if($scope.currentRide != undefined && $scope.selectedTrip != undefined){
            $scope.matched = MatchesService.getMatchedId($window.localStorage.token, $scope.currentRide.id, $scope.selectedTrip.id)
                .then(function(res) {
                    return res.data[0];
                });
        }



        //Needs PUT by rideId, send notification of request to driver
        //Update PostedTrips and RideRequest to pending
        $scope.commit = function() {
            RideRequestsService.changeState($window.localStorage.token, $scope.currentRide.id, "pending")
                .then(function(res) {
                    return res.data;
                });
            PostedTripsService.changeState($window.localStorage.token, $scope.selectedTrip.id, "pending")
                .then(function(res) {
                    return res.data;
                });

            MatchesService.getMatchedId($window.localStorage.token, $scope.currentRide.id, $scope.selectedTrip.id)
                .then(function(res) {
                    return res.data[0];
                }).then(function(response) {
                    MatchesService.changeState($window.localStorage.token, response.id, "pending")

                    .then(function(check) {
                        if (check.status === 200) {
                            $state.go("rider");
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
                console.log('before slide');
                element.slideToggle();
                console.log('after slide');
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