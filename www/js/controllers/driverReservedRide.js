angular.module('starter.controllers')
    .controller('DriverReservedRideCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', 'SSFAlertsService',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate, SSFAlertsService) {
            //The trip details will be filled with the trip data from the backend.
            $scope.tripDetails = {
                driverID: "122",
                startAddress: "1748 San Diego Ave, San Diego, CA 92110", //(JSON object)
                startGeopoint: "32.743414, -117.182739", // (lon,lat)
                destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)
                destGeopoint: "47.609561, -122.341505",
                startDate: "4/22/2016",
                startTime: "06:00pm",
                expectedEndTime: "06:00",
                seatsAvailable: "2",
                roundTrip: "true",
                dogOK: "false",
                estimatedSharedExpense: "20",
                rideActive: false, //Need to add a "ride active" property as a way to show/hide buttons on html.
                rideCompleted: false //By setting rideCompleted to true, the ride will be complete, and the accompanying function will pass the completed trip into the driver history
            };
            //committed riders will be pulled from matched RideRequest.
            $scope.committedRiders = [{
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
                haveDo: false,
                maxWillingToPay: "60",
                tripCompleted: false //this is similar to rideCompleted, giving the property of a completed trip, accompanying function will then be able to be stored into rider history page.

            }, {
                name: "Leif Meister",
                riderID: "2",
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
                maxWillingToPay: "65",
                tripCompleted: false
            }, {
                name: "Bongo Ripper",
                riderID: "3",
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
                maxWillingToPay: "75",
                tripCompleted: false
            }];
            // This function will start the ride, hide the start button, then display the "Complete Ride".   
            $scope.rideStart = function() {
                $scope.tripDetails.rideActive = true;

            };

            $scope.rideComplete = function() {
                $scope.tripDetails.rideCompleted = true;
                for (var i = 0; i <= $scope.committedRiders.length - 1; i++) {
                    $scope.committedRiders[i].tripCompleted = true;
                }
                $state.go();
            };

            //Warn Driver of functionality
            $scope.cancelTrip = function() {
                $translate(['CANCEL.WARNING', 'CANCEL.PROMPT']).then(function(translation) {
                        SSFAlertsService.showAlert(translation['CANCEL.WARNING'], translation['CANCEL.PROMPT']);
                    })
                    .then(function(response) {
                        if (response == true) {
                            // delete ride, notify riders, return to driver page
                        }
                    });
            };
        }
    ]);