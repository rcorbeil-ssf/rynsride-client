angular.module('starter.controllers')

.controller('RiderTripDetailsCtrl', ['$scope', '$rootScope', '$translate', '$state', 'RiderTripDetailsService', 'vehicleDetails', '$ionicPopover',
    function($scope, $rootScope, $translate, $state, RiderTripDetailsService, vehicleDetails, $ionicPopover) {


        $scope.logout = function() {
            $rootScope.$broadcast('request:auth');
        };

        // When the 'Commit' button is clicked, we go to the Rider page ](Requested Rides)
        $scope.commit = function() {
            $state.go('rider');
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

        $scope.currentTrip = RiderTripDetailsService.selectedTrip();

        $scope.vehicleDetails = vehicleDetails;
        
        //Needs PUT by rideId, send notification of request to driver
        //Update PostedTrips and RideRequest to pending

    }
]);