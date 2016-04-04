angular.module('starter.controllers')
.controller('DriverPendingTripCtrl', ['$scope', '$state', '$ionicHistory', 'getRiderDetails',
    function($scope, $state, $ionicHistory, getRiderDetails) {
    
        $scope.pendingRide = getRiderDetails;
    
    }
]);

// Driver Pending Trip page
// 	1) Upon entering this page the controller must make a request of the RideService to retrieve
// 	   information regarding the pending rider as well as the pending ride request.
// 	2) It will display this info in cards.
// 	3) If 'Accept Rider' is clicked, the controller pairs the matched rideRequest to the trip in 
// 	   the RideService and goes to the Trip Details page.
// 	   If 'Decline Rider' is clicked, the controller changes the state of the rideRequest from 
//     pending to matched in the RideService and goes to the Driver page.
// 	4) If a tab is clicked we go to the appropriate page.