angular.module('starter.controllers')
    .controller('DriverTripDetailsCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', 'TripServices', "RiderTripDetailsService",
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate, TripServices, RiderTripDetailsService) {
            /*  doing a service.all to get the information for trip. need to go into Trip model path
                when response == 200, $scope.tripDetails = response.data
                going to need a way to get a screenshot of the trip map (if possible, but not needed.)
            */
            $scope.tripDetails = RiderTripDetailsService.currentRide();
            
            $scope.toggle1 = function() {
                $scope.toggleA ^= true; 
            };
        }
    ])
    
    .directive('toggle1', function () {
        return {
            restrict:'C',
            link: function (scope, element, attrs) {
    
                scope.toggle1Click = function(){
                    element.slideToggle();
                };
            }                  
        };
    })