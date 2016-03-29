angular.module('starter.controllers')
    .controller('HistoryRiderCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate) {
            // Rider history will ony display the users completed trips. Clicking on the trip will send the user to a rider reserved ride page, filled with driver information.
            // TODO: Allow driver to rate riders, if skipped previously.


            $scope.committedDrivers = [{
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
                    estimatedSharedExpense: "20",
                    tripId: "1",
                    needReview: true, //need a review boolean to determine whether the driver still needs to be reviewed. Review page will return a false after a review has been submitted.
                    state: "completed"
                }, {
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
                    estimatedSharedExpense: "20",
                    tripId: "2",
                    needReview: false, //need a review boolean to determine whether the driver still needs to be reviewed. Review page will return a false after a review has been submitted.
                    state: "completed"
                }, {
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
                    estimatedSharedExpense: "20",
                    tripId: "3",
                    needReview: true, //need a review boolean to determine whether the driver still needs to be reviewed. Review page will return a false after a review has been submitted.
                    state: "completed"
                }

            ];

            $scope.pastRide = [{
                name: "James Boogaloo",
                riderID: "1",
                age: "51",
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
                haveWheelchair: false,
                maxWillingToPay: "60",
                cellNumber: "909-210-5356",
                tripId: "1", //need tripId for future reference of trip
                state: "completed" //This is similar to rideCompleted, giving the property of a completed trip, accompanying function will then be able to be stored into rider history page.

            }, {
                name: "James Boogaloo",
                riderID: "1",
                age: "51",
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
                haveWheelchair: false,
                maxWillingToPay: "60",
                cellNumber: "909-210-5356",
                tripId: "2", //need tripId for future reference of trip
                state: "completed" //This is similar to rideCompleted, giving the property of a completed trip, accompanying function will then be able to be stored into rider history page.

            }, {
                name: "James Boogaloo",
                riderID: "1",
                age: "51",
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
                haveWheelchair: false,
                maxWillingToPay: "60",
                cellNumber: "909-210-5356",
                tripId: "3", //need tripId for future reference of trip
                state: "completed" //This is similar to rideCompleted, giving the property of a completed trip, accompanying function will then be able to be stored into rider history page.

            }];

            $scope.goToDriver = function() {
                $state.go("historyDriver");
            };

            $scope.riderHistory = function(history) {
                var rider = history;
                $scope.storage = [{}];
                //pull data obtain where tripId = drivers tripId, pass into riderReservedRide. 
                //Because State == 'completed', the "start trip", "cancel trip", etc, buttons will not appear and only "Completed Trip!" will be available.
                // IF rider's needReview = true, the user can change state within review page. user can navigate to review page within the riderReservedRide.
                //pass the user data table of $scope.committedDrivers[i] to riderRating through a service
                //service sends off the stored object of committed driver to riderReservedRide, where it will populate the page with details.
                for (var i = 0; i <= $scope.committedDrivers.length - 1; i++) {
                    if (rider.tripId == $scope.committedDrivers[i].tripId) {
                        $scope.storage.push($scope.committedDrivers[i]);
                    }
                }
                $state.go("riderReservedRide");
            };
        }
    ]);