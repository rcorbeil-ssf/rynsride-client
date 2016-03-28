angular.module('starter.controllers')
.controller('PostTripCtrl', ['$scope', '$state', '$ionicHistory',
    function($scope, $state, $ionicHistory) {
    
    $scope.tripArray = [];

    $scope.postTrip = function(trip) {
        $scope.tripArray.push();
    };
    
    // $scope.prepop = function() {
    //     var date = new Date().toISOString().substring(0, 10),
    //     field = document.querySelector('#date');
    //     field.value = date;
    // };

    }
]);