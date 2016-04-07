angular.module('starter.controllers')
    .controller('DriverTripDetailsCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', 'TripServices', 
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate, TripServices) {
            /*  doing a service.all to get the information for trip. need to go into Trip model path
                when response == 200, $scope.tripDetails = response.data
                going to need a way to get a screenshot of the trip map (if possible, but not needed.)
            */
            $scope.tripDetails = TripServices.currentTrip();
        }
    ]);