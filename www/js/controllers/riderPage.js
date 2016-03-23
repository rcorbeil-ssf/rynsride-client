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
                state: "New",
              
            },
            {
                startDate: "April 17",
                state: "Matched"
            },
            {
                startDate: "May 3",
                state: "Pending"
              
            },
            {
                startDate: "July 8",
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