angular.module('starter.controllers')
    .controller('RiderMatchedRideCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate) {
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
        }
    ]);