angular.module('starter.controllers')

.controller('AppsCtrl', ['$state', '$scope', function($state, $scope) {

    $scope.goHome = function() {
        $state.go('lobby');
    };

    $scope.goRider = function() {
        $state.go('rider');    
    };

    $scope.goPlus = function() {
    };    

    $scope.goDriver = function() {
        $state.go('driver');    
    };    

    $scope.goProfile = function() {
        $state.go('userProfile');    
    };

}]);