angular.module('starter.controllers')

.controller('LobbyCtrl', ['$scope', '$rootScope', '$translate', '$state', function($scope, $rootScope, $translate, $state) {

    $scope.logout = function() {
        $rootScope.$broadcast('request:auth');
    };

    $scope.tripDetails = function() {
        $state.go('riderTripDetails');
    };
    
    $scope.rides = [{
        
    }];


    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        }
        else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };

}]);