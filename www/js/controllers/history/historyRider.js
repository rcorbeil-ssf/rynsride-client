angular.module('starter.controllers')
    .controller('HistoryRiderCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', 'previousRides', 'HistoryService', 'selectedTrip', 'driver', 'RideRequestsService', '$window', 'allPastRides', 
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate, previousRides, HistoryService, selectedTrip, driver, RideRequestsService, $window, allPastRides) {
            // Rider history will ony display the users completed trips. Clicking on the trip will send the user to a rider reserved ride page, filled with driver information.
            // TODO: Allow driver to rate riders, if skipped previously.

            $scope.selectedTripInfo = selectedTrip;
            $scope.driverInfo = driver;
            $scope.pastRide = previousRides; 

            $scope.goToDriver = function() {
                $state.go("historyDriver", {}, {reload: true});
            };
            updateStates();
            function updateStates() {
            	var riderHistory = allPastRides;
            	for (var i = 0; i < riderHistory.length; i++){
            		if(riderHistory[i].state == 'pending' || riderHistory[i].state == 'new'){
                    	riderHistory[i].state = 'canceled';
                    	console.log(riderHistory[i]);
            			RideRequestsService.updateStates($window.localStorage.token, riderHistory[i].riderId, riderHistory[i]);	
                    } else if(riderHistory[i].state == 'started') {
                    	riderHistory[i].state = 'ended';
                    	console.log(riderHistory[i]);
            			RideRequestsService.updateStates($window.localStorage.token, riderHistory[i].riderId, riderHistory[i]);
                    }
            	}
            }
            $scope.riderHistory = function(rides) {
                
                HistoryService.saveTrip(rides);
                //pull data obtain where tripId = drivers tripId, pass into riderReservedRide. 
                //Because State == 'completed', the "start trip", "cancel trip", etc, buttons will not appear and only "Completed Trip!" will be available.
                // IF rider's needReview = true, the user can change state within review page. user can navigate to review page within the riderReservedRide.
                //pass the user data table of $scope.committedDrivers[i] to riderRating through a service
                //service sends off the stored object of committed driver to riderReservedRide, where it will populate the page with details.
                // Commented out to try new formulas - Oscar
                // for (var i = 0; i <= $scope.committedDrivers.length - 1; i++) {
                //     if (rider.tripId == $scope.committedDrivers[i].tripId) {
                //         $scope.storage.push($scope.committedDrivers[i]);
                //     }
                // }
                $state.go('historyRiderResults', {}, {reload: true});
            };
        }
    ]);