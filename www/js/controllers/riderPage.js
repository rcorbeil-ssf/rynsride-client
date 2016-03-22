angular.module('starter.controllers')
.controller('RiderPageCtrl', ['$scope', '$state', '$ionicHistory',
    function($scope, $state, $ionicHistory) {
        
        $scope.myRides = [];
        for (var i = 0; i < 3; i++) {
            $scope.myRides[i] = {
                name: i,
                items: []
            };
        } 
          
        $scope.filterOptions = {
          sort:[
    		{name : 'All', state: "All" },
    		{name : 'New', state: "New" },
    		{name : 'Matched', state: "Matched"},
    		{name : 'Pending', state: "Pending" },
    		{name : 'Reserved', state: "Reserved" }
        ]};
        
        $scope.filterItem = {
            store: $scope.filterOptions.sort[0]
        };

        $scope.customFilter = function (trips) {
            if (trips.state === $scope.filterItem.store.state) {
                return true;
            } else if($scope.filterItem.store.state === "All") {
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
    
    }
]);