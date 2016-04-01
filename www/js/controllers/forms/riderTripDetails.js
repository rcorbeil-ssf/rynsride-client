angular.module('starter.controllers')

.controller('RiderTripDetailsCtrl', ['$scope', '$rootScope', '$translate', '$state', 'RiderTripDetailsService', 'vehicleDetails',
function($scope, $rootScope, $translate, $state, RiderTripDetailsService, vehicleDetails) {


    $scope.logout = function() {
        $rootScope.$broadcast('request:auth');
    };

    // When the 'Commit' button is clicked, we go to the Rider page ](Requested Rides)
    $scope.commit = function() {
        $state.go('rider');
    };

    //     RiderTripDetails page
    // 	   Upon entering this page the controller must get from the TripService the trip in question.
    // 	   It will use this trip info to display the trip details.  To display the user name, age, gender
    // 	   it will need to make a request of the UserService to retrieve this info from the backend.

    $scope.currentTrip = RiderTripDetailsService.currentTrip();
     
    $scope.vehicleDetails = vehicleDetails;    


}]);