angular.module('starter.controllers', [])
.controller('LandingCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk', 
        'ionicMaterialMotion', "$translate",
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $translate) {
    
    $timeout(function(){
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();
    },0);
    $scope.login = function() {
        $state.go('login');
    };
    $scope.register = function() {
        $state.go('register');
    };

}]);