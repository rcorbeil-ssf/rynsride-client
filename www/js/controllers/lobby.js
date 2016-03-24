angular.module('starter.controllers')

.controller('LobbyCtrl', ['$scope', '$rootScope', '$translate', '$state', function($scope, $rootScope, $translate, $state) {

    $scope.logout = function() {
        $rootScope.$broadcast('request:auth');
    };
    
    $scope.tripDetails = function() {
        $state.go('riderTripDetails');
    };

// Lobby page (AvailableTripsNearYou)
// 	1) Upon entering this page the controller must request from TripService the available trips nearby.
// 	2) It will display this info in a list.
// 	3) When a list item is clicked, it saves a reference to the selected trip in the TripService, then
// 	goes to the Rider Trip Details page.
    
    $scope.rides = [
        {startDate: 'April 5', location: 'San Diego', driver: 'Ryan'},
        {startDate: 'May 15', location: 'Riverside', driver: 'Tim'},
        {startDate: 'June 25', location: 'San Diego', driver: 'Allen'},
        {startDate: 'April 5', location: 'San Diego', driver: 'Ryan'},
        {startDate: 'May 15', location: 'Riverside', driver: 'Tim'},
        {startDate: 'June 25', location: 'San Diego', driver: 'Allen'}
    ];

}]);