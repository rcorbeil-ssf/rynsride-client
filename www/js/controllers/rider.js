angular.module('starter.controllers')

.controller('RiderCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', 'translation',
    function($scope, $state, $ionicHistory, SSFTranslateService, translation) {
        
        
        $scope.myRides = [];
        for (var i = 0; i < 3; i++) {
            $scope.myRides[i] = {
                name: i,
                items: []
            };
        } 

        $scope.filterOptions = {
            sort:[
        		{name: translation[0], state: translation[0]},
        		{name: translation[1], state: translation[1]},
        		{name: translation[2], state: translation[2]},
        		{name: translation[3], state: translation[3]},
        		{name: translation[4], state: translation[4]}
            ]
        };
        
        $scope.filterItem = {
            store: $scope.filterOptions.sort[0]
        };

        $scope.customFilter = function (trips) {
            if (trips.state === $scope.filterItem.store) {
                return true;
            } else if ($scope.filterItem.store === translation[0]) {
                return true;
            } else {
                return false;
            }
        };

        $scope.riderTrips= [
            {
                startDate: "June 4",
                destination: "Encinitas",
                state: translation[1],
              
            },
            {
                startDate: "April 17",
                destination: "Solana Beach",
                state: translation[2]
            },
            {
                startDate: "May 3",
                destination: "Ocean Beach",
                state: translation[3]
              
            },
            {
                startDate: "July 8",
                destination: "Riverside",
                state: translation[4]
            }
        ];
        
        $scope.goTo = function(trip) {
            if (trip === "New") {
                $state.go('riderNewRide');
            } else if (trip === "Matched") {
                $state.go('riderMatchedRide');
            } else if (trip === "Pending") {
                $state.go('riderPendingRide');
            } else if (trip === "Reserved") {
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