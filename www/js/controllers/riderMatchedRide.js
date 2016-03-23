angular.module('starter.controllers')
    .controller('RiderMatchedRideCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate) {
            $scope.tripDetails = [{
                "driverName": "Oscar Cornejo",
                "driverID" : "122",
                "startAddress": "1748 San Diego Ave, San Diego, CA 92110", //(JSON object)
            	"startGeopoint": "32.743414, -117.182739", // (lon,lat)
            	"destAddress": "1530 Pike Place, Seattle, WA 98101", // (JSON object)
            	"destGeopoint": "47.609561, -122.341505",
            	"startDate": "4/22/2016",
                "startTime": "06:00pm",
            	"expectedEndTime": "06:00am",
            	"seatsAvailable": "2",
            	"roundTrip": "true",
            	"dogOK": "false",
            	"estimatedSharedExpense": "20"
            }];
        }
    ]);