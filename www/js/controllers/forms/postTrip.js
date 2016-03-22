angular.module('starter.controllers')
.controller('PostTripCtrl', ['$scope', '$state', '$ionicHistory',
    function($scope, $state, $ionicHistory) {
    
    $scope.tripArray = [];

    $scope.postTrip = function(trip) {
        $scope.tripArray.push();
    };
    
    }
]);