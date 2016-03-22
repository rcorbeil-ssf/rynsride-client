angular.module('starter.controllers')

.controller('LobbyCtrl', ['$scope', '$rootScope', '$translate', '$state', function($scope, $rootScope, $translate, $state) {

    $scope.logout = function() {
        $rootScope.$broadcast('request:auth');
    };

    $scope.tripDetails = function() {
        $state.go('riderTripDetails');
    };
    
    $scope.rides = [
        {startDate: 'April 5', location: 'San Diego'},
        {startDate: 'May 15', location: 'Riverside'},
        {startDate: 'June 25', location: 'San Diego'},
    ];

}]);