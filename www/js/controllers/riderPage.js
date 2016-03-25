angular.module('starter.controllers')
.controller('RiderPageCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', 'translation',
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
        		{name: translation[0], state: "All" },
        		{name: translation[1], state: "New" },
        		{name: translation[2], state: "Matched"},
        		{name: translation[3], state: "Pending" },
        		{name: translation[4], state: "Reserved" }
            ]
        };
        
        $scope.filterItem = {
            store: $scope.filterOptions.sort[0]
        };

        $scope.customFilter = function (trips) {
            if (trips.state === $scope.filterItem.store) {
                return true;
            } else if ($scope.filterItem.store === "All") {
                return true;
            } else {
                return false;
            }
        };

        $scope.trips= [
            {
                startDate: "June 4",
                destination: "Encinitas",
                state: "New",
              
            },
            {
                startDate: "April 17",
                destination: "Solana Beach",
                state: "Matched"
            },
            {
                startDate: "May 3",
                destination: "Ocean Beach",
                state: "Pending"
              
            },
            {
                startDate: "July 8",
                destination: "Riverside",
                state: "Reserved",
              
            }
        ];
        
        $scope.goTo = function(trip) {
            if (trip === "New") {
                $state.go();
            } else if (trip === "Matched") {
                $state.go();
            } else if (trip === "Pending") {
                $state.go();
            } else if (trip === "Reserved") {
                $state.go();
            }
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