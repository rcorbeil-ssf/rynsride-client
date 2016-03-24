angular.module('starter.controllers')
.controller('RequestRideCtrl', ['$scope', '$state', '$ionicHistory',
    function($scope, $state, $ionicHistory) {
    
    $scope.rideArray = [];

    $scope.requestRide = function(ride) {
        $scope.rideArray.push();
    };
    
    }
]);