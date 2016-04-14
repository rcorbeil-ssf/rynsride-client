angular.module('starter.controllers')

.controller('LobbyCtrl', ['$scope', '$rootScope', '$translate', '$state', 'RiderTripDetailsService', 'tripDetails',
    function($scope, $rootScope, $translate, $state, RiderTripDetailsService, tripDetails) {

        $scope.tripDetails = function(ride) {
            RiderTripDetailsService.currentTrip(ride);
            $state.go('riderTripDetails-Lobby');
        };

        $scope.rides = tripDetails;

    }
]);