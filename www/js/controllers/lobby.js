angular.module('starter.controllers')

.controller('LobbyCtrl', ['$scope', '$rootScope', '$translate', '$state', 'RiderTripDetailsService', 'tripDetails',
function($scope, $rootScope, $translate, $state, RiderTripDetailsService, tripDetails) {

    $scope.logout = function() {
        $rootScope.$broadcast('request:auth');
    };

    $scope.tripDetails = function(ride) {
        RiderTripDetailsService.currentTrip(ride);
        $state.go('riderTripDetails');
    };

    // Lobby page (AvailableTripsNearYou)
    // 	1) Upon entering this page the controller must request from TripService the available trips nearby.
    // 	2) It will display this info in a list.
    // 	3) When a list item is clicked, it saves a reference to the selected trip in the TripService, then
    // 	goes to the Rider Trip Details page.

    $scope.rides = tripDetails;

}]);