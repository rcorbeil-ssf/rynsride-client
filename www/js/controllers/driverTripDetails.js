angular.module('starter.controllers')
.controller('DriverTripDetailsCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', 'TripServices',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate, TripServices) {
            /*  doing a service.all to get the information for trip. need to go into Trip model path
                when response == 200, $scope.tripDetails = response.data
                going to need a way to get a screenshot of the trip map (if possible, but not needed.)
            */
            
            // vvvvv Ryan & Rachel's function for tabs vvvvvv
            this.onTabSelected = function(_scope){
  
                // if we are selectng the driver title then 
                // change the state back to the top state
                if ( _scope.title === 'Driver Page') {
                  setTimeout(function() {
                    $state.go('tab.driver', {});
                  },20);
                }
            };
            $scope.tripDetails = TripServices.currentTrip();
}]);
