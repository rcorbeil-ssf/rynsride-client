angular.module('starter.controllers')

.controller('FooterCtrl', ['$state', '$scope', '$ionicPopover', function($state, $scope, $ionicPopover) {

    $scope.goHome = function() {
        $state.go("lobby");
       // $state.go('lobby', {}, {reload: true,  inherit: false});
    };

    $scope.goRider = function() {
        $state.go('rider');
    };

    $scope.goDriver = function() {
        $state.go('driver');
    };

    $scope.goProfile = function() {
        $state.go('userProfile');
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