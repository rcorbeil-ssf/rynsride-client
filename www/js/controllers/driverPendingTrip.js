angular.module('starter.controllers')
.controller('DriverPendingTripCtrl', ['$scope', '$state', '$ionicHistory',
    function($scope, $state, $ionicHistory) {
    
    $scope.newRide = {
        rideDate: 'May 3',
        pickupTime: '3:00pm',
        pickupLocation: 'Encinitas',
        dropoffLocation: 'Ocean Beach',
        maxPayment: '$15',
        wheelchair: 'false',
        dog: 'true',
        roundTrip: 'false'
    };
    
    $scope.fakeUser = {
        name: 'Leonardo DiCaprio',
        age: 41,
        gender: 'Male',
        image: 'http://images.boomsbeat.com/data/images/full/32034/422817_original-jpg.jpg'
    };
    
    }
]);