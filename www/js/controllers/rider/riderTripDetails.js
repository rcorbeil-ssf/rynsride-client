angular.module('starter.controllers')

.controller('RiderTripDetailsCtrl', ['$scope', '$rootScope', '$translate', '$state', 'SSFAlertsService',
'RiderTripDetailsService', 'RideRequestsService', '$ionicPopover', '$window',
    function($scope, $rootScope, $translate, $state, SSFAlertsService, RiderTripDetailsService, RideRequestsService, $ionicPopover, $window) {

        // When the 'Commit' button is clicked, we go to the Rider page ](Requested Rides)
        $scope.commit = function(data) {
            var tripInfo = {
                riderId: $window.localStorage.userId,
                startAddress:  data.startAddress,
                startGeopoint: data.startGeopoint,
                destAddress: data.destAddress,
                destGeopoint: data.destGeopoint,
                startDate: data.startDate,
                startTime: data.startTime,
                state: 'pending'
            };
            RideRequestsService.postRideData(tripInfo);
            SSFAlertsService.showAlert('Request Made', 'ASDF');
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

        $scope.currentTrip = RiderTripDetailsService.currentTrip();
        $scope.selectedTrip = RiderTripDetailsService.selectedTrip();
        // $scope.vehicleDetails = vehicleDetails;
        
        //Needs PUT by rideId, send notification of request to driver
        //Update PostedTrips and RideRequest to pending
        
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