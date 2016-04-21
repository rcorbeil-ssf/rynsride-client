angular.module('starter.controllers')

.controller('FooterCtrl', ['$state', '$scope', '$ionicPopover', function($state, $scope, $ionicPopover) {

    $scope.goHome = function() {
        $state.go("lobby");
    };

    $scope.goRider = function() {
        $state.go('rider', {}, {reload: true});
    };

    $scope.goDriver = function() {
        $state.go('driver', {}, {reload: true});
    };

    $scope.goProfile = function() {
        $state.go('userProfile', {}, {reload: true});
    };

    $ionicPopover.fromTemplateUrl('templates/popups/footerPopup.html', {
            scope: $scope
        })
        .then(function(popover) {
            $scope.popover = popover;
        });

    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };

    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    
    $scope.rideRequestGo = function() {
        $state.go('requestRide');  
    };
    $scope.postTripGo = function() {
        $state.go('postTrip');  
    };

}]);