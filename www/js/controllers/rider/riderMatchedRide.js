angular.module('starter.controllers')
    .controller('RiderMatchedRideCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', 'getMatchedTrips',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate,  getMatchedTrips) {
            // 1) Upon entering this page, the controller must make a request of the RideService for the
            // saved ride.
            // 2) It makes a request of the TripService to retrieve (from backend) all the matched trips for this ride.
            // 3) These are displayed in a list.
            // 4) If a list item is clicked, the trip is saved in the TripService and goes to the RiderTripDetails page.

            $scope.matchedDrivers = getMatchedTrips; // getMatchedTrips;

            $scope.riderTrip = {
                    
            };
            $scope.tripMatch = function(drivers) {
                //The drivers information is going to be sent to the trip details page via service
                // Page will then move to corresponding page, "riderTripDetails", and populate with information sent via service.
                
                $state.go("riderTripDetailsRider");
            };
        }
    ]);