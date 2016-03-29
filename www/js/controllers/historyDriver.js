angular.module('starter.controllers')
    .controller('HistoryDriverCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate) {
            // Driver history will ony display the users completed trips. Clicking on the trip will send the user to a driver reserved ride page, filled with previous riders.
            // TODO: Allow driver to rate riders, if skipped previously.


            $scope.pastTrip = [{
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
                    tripId: "1251",
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
                    tripId: "156",
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
                    tripId: "1221",
                    state: "completed"
                }

            ];

            $scope.committedRiders = [{
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
                needReview: false, //need a review boolean to determine whether the rider still needs to be reviewed. Review page will return a false after a review has been submitted.
                tripId: "1251", //need tripId for future reference of trip
                state: "completed" //This is similar to rideCompleted, giving the property of a completed trip, accompanying function will then be able to be stored into rider history page.

            }, {
                name: "Leif Meister",
                riderID: "2",
                age: "26",
                startAddress: "3232 Fake Ln, La Mesa, CA 92110",
                startGeopoint: "32.771139, -117.030657", // (lon,lat) 
                destAddress: "1001 Western Ave, Seattle, WA 98104",
                destGeopoint: "47.604322, -122.337528",
                startDate: "04/22/2016",
                startAfterTime: "06:00pm",
                startBeforeTime: "07:30pm",
                seatsRequired: "1",
                roundTrip: false,
                haveDog: false,
                haveWheelchair: false,
                maxWillingToPay: "65",
                tripId: "1251",
                needReview: false,
                state: "completed"
            }, {
                name: "Oscar Ripper",
                riderID: "3",
                age: "21",
                startAddress: "3537 Wightman St, San Diego, CA 92104",
                startGeopoint: "32.747845, -117.117068", // (lon,lat) 
                destAddress: "1436 SE Taylor St, Portland, OR 97214",
                destGeopoint: "45.514932, -122.650998",
                startDate: "04/22/2016",
                startAfterTime: "06:00pm",
                startBeforeTime: "07:30pm",
                seatsRequired: "1",
                roundTrip: false,
                haveDog: false,
                haveWheelchair: false,
                maxWillingToPay: "75",
                cellNumber: "6193844231",
                email: "oscar@123.com",
                tripId: "1251",
                needReview: false,
                state: "completed"
            }];

            $scope.goToRider = function() {
                $state.go("historyRider");
            };
            
            $scope.driverHistory = function (history){
                var driver = history;
                $scope.storage = [{}];
                //pull data obtain where tripId = riders tripId, pass into driverReservedRide. 
                //Because State == 'completed', the "start trip", "cancel trip", etc, buttons will not appear and only "Completed Trip!" will be available.
                // IF rider's needReview = true, the user can change state within review page. user can navigate to review page within the driverReservedRide.
                //pass the user data table of $scope.committedRiders[i] to riderRating through a service
                //pass the pastRide table and $scope.committedRiders[i]
                //service sends off the stored array of committed driver to riderReservedRide, where it will populate the page with details.
                for (var i = 0; i <= $scope.committedRiders.length - 1; i++){
                    if (driver.tripId == $scope.committedRiders[i].tripId){
                        $scope.storage.push($scope.committedRiders[i]); //Is this necessary for services? - James
                    }
                }
                $state.go("driverReservedRide");
            };


        }
    ]);