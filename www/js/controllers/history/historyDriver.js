angular.module('starter.controllers')
    .controller('HistoryDriverCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', 'previousTrips', 'PostedTripsService', '$window', 'HistoryService', 'previousRiders', 'selectedTrip',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate, previousTrips, PostedTripsService, $window, HistoryService, previousRiders, selectedTrip) {
            // Driver history will ony display the users completed trips. Clicking on the trip will send the user to a driver reserved ride page, filled with previous riders.
            // TODO: Allow driver to rate riders, if skipped previously.


            $scope.pastTrips = previousTrips;
            $scope.tripDetails = selectedTrip;
            $scope.committedRiders = previousRiders;
            updateStates();
            function updateStates() {
            	var driveRhistory = previousTrips;
            	for (var i = 0; i < driveRhistory.length; i++){
            		if(driveRhistory[i].state == 'pending' || driveRhistory[i].state == 'new'){
                    	driveRhistory[i].state = 'canceled';
                    	console.log(driveRhistory[i]);
            			PostedTripsService.updateStates(driveRhistory[i].riderId, driveRhistory[i], $window.localStorage.token);	
                    } else if(driveRhistory[i].state == 'started') {
                    	driveRhistory[i].state = 'ended';
                    	console.log(driveRhistory[i]);
            			PostedTripsService.updateStates(driveRhistory[i].riderId, driveRhistory[i], $window.localStorage.token);
                    }
            	}
            }
            $scope.goToRider = function() {
                $state.go("historyRider");
            };
            
            $scope.driverHistory = function (trip){
                HistoryService.saveTrip(trip);
                $state.go("historyDriverResults");
            };
        }
    ]);