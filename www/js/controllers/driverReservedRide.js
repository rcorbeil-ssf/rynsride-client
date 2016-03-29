angular.module('starter.controllers')
    .controller('DriverReservedRideCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate) {

        this.onTabSelected = function(_scope){
            // if we are selectng the driver title then 
            // change the state back to the top state
            if ( _scope.title === 'Driver Page') {
                setTimeout(function() {
                    $state.go('tab.driver', {});
                }, 20);
            }
        };


        }
    ]);