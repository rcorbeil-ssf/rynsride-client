angular.module('starter.controllers')
    .controller('RiderMatchedRideCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate) {
            // 1) Upon entering this page, the controller must make a request of the RideService for the
            // saved ride.
            // 2) It makes a request of the TripService to retrieve (from backend) all the matched trips for this ride.
            // 3) These are displayed in a list.
            // 4) If a list item is clicked, the trip is saved in the TripService and goes to the RiderTripDetails page.

            $scope.matchedDrivers = [{
                driverName: "Oscar Cornejo",
                driverID: "122",
                startAddress: "1748 San Diego Ave, San Diego, CA 92110", //(JSON object)
                startGeopoint: "32.743414, -117.182739", // (lon,lat)
                destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)
                destGeopoint: "47.609561, -122.341505",
                startDate: "4/22/2016",
                startTime: "06:00pm",
                expectedEndTime: "06:00am",
                seatsAvailable: "2",
                roundTrip: true,
                dogOK: false,
                estimatedSharedExpense: "20"
            }, {
                driverName: "Bernie Mac",
                driverID: "142",
                startAddress: "1748 San Diego Ave, San Diego, CA 92110", //(JSON object)
                startGeopoint: "32.743414, -117.182739", // (lon,lat)
                destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)
                destGeopoint: "47.609561, -122.341505",
                startDate: "4/22/2016",
                startTime: "06:00pm",
                expectedEndTime: "06:00am",
                seatsAvailable: "2",
                roundTrip: true,
                dogOK: false,
                estimatedSharedExpense: "20"
            }, {
                driverName: "Superman",
                driverID: "151",
                startAddress: "1748 San Diego Ave, San Diego, CA 92110", //(JSON object)
                startGeopoint: "32.743414, -117.182739", // (lon,lat)
                destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)
                destGeopoint: "47.609561, -122.341505",
                startDate: "4/22/2016",
                startTime: "06:00pm",
                expectedEndTime: "06:00am",
                seatsAvailable: "2",
                roundTrip: true,
                dogOK: false,
                estimatedSharedExpense: "20"
            }];

            $scope.riderTrip = {
                name: "James Boogaloo",
                riderID: "1",
                startAddress: "1337 Leet Dr., San Diego, CA 92110",
                startGeopoint: "32.753414, -118.182739", // (lon,lat) 
                destAddress: "705 Pike St, Seattle, WA 98101",
                destGeopoint: "47.612049, -122.332292",
                startDate: "04/22/2016",
                startAfterTime: "05:00pm",
                startBeforeTime: "08:00pm",
                seatsRequired: "1",
                roundTrip: false,
                haveDog: false,
                maxWillingToPay: "60"
            };
            $scope.tripMatch = function(drivers) {
                //The drivers information is going to be sent to the trip details page via service
                // Page will then move to corresponding page, "riderTripDetails", and populate with information sent via service.
                $state.go("riderTripDetails");
            };
            // this.onTabSelected = function(_scope) {

            //     // if we are selectng the rider title then 
            //     // change the state back to the top state
            //     if (_scope.title === 'Rider Page') {
            //         setTimeout(function() {
            //             $state.go('tab.rider', {});
            //         }, 20);
            //     }
            // };
        }
    ]);