angular.module('starter.controllers')

.controller('RiderCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', 'translation', 'getRides',
    function($scope, $state, $ionicHistory, SSFTranslateService, translation, getRides) {
        
        $scope.rides = getRides;
        
        $scope.filterOptions = {
            sort:[
        		{name: translation[0], state: 'all'},
        		{name: translation[1], state: 'new'},
        		{name: translation[2], state: 'matched'},
        		{name: translation[3], state: 'pending'},
        		{name: translation[4], state: 'reserved'}
            ]
        };
        
        $scope.filterItem = {
            store: 'all'
        };

        $scope.customFilter = function(trips) {
            if($scope.filterItem.store === 'all') {
                return true;
            } else if(trips.state === $scope.filterItem.store) {
                return true;
            } else {
                return false;
            }
        };
        
        $scope.goTo = function(trip) {
            if (trip.state === "new") {
                $state.go('riderNewRide');
            } else if (trip.state === "matched") {
                $state.go('riderMatchedRide');
            } else if (trip.state === "pending") {
                $state.go('riderPendingRide');
            } else if (trip.state === "reserved") {
                $state.go('riderReservedRide');
            }
        }; 
        
        $scope.historyGo = function() {
          $state.go('historyRider'); 
        };
    
    }
]);

// Rider page
// 	1) Upon entering this page the controller must make a request of the RideService to retrieve
// 	   all the matched, reserved, and pending rides for the logged-in user.
// 	2) It will display this info in a list.
// 	3) If a 'match' list item is clicked, the controller saves the matched rideRequest in 
// 	   the RideService and goes to the Rider (MatchedRide) page.
// 	   If a 'reserved' list item is clicked,the controller saves the rideRequest in the RideService and
// 	   goes to the Rider (ReservedRide) page.
// 	   If a 'pending' list item is clicked, the controller saves the rideRequest in the RideService and
// 	   goes to the Rider (PendingRide) page.
// 	4) When this history button is clicked we go to the history page.
// 	5) If a tab is clicked we go to the appropriate page.