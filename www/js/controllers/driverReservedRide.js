angular.module('starter.controllers')
.controller('DriverReservedRideCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate) {
            $scope.tripDetails = {
                "driverID" : "122",
                "startAddress": "1748 San Diego Ave, San Diego, CA 92110", //(JSON object)
            	"startGeopoint": "32.743414, -117.182739", // (lon,lat)
            	"destAddress": "1530 Pike Place, Seattle, WA 98101", // (JSON object)
            	"destGeopoint": "47.609561, -122.341505",
            	"startDate": "4/22/2016",
                "startTime": "06:00pm",
            	"expectedEndTime": "06:00",
            	"seatsAvailable": "2",
            	"roundTrip": "true",
            	"dogOK": "false",
            	"estimatedSharedExpense": "20"
            };
            $scope.committedRiders = [{
                                "name": "James Boogaloo",
                                "riderID": "1", 
                                "startAddress": "1337 Leet Dr., San Diego, CA 92110",
                                "startGeopoint": "32.753414, -118.182739", // (lon,lat) 
                                "destAddress": "705 Pike St, Seattle, WA 98101",
                                "destGeopoint": "47.612049, -122.332292", 
                                "startDate": "04/22/2016",
                                "startAfterTime": "05:00pm", 
                                "startBeforeTime": "08:00pm",
                                "seatsRequired": "1", 
                                "roundTrip": false, 
                                "haveDog": false, 
                                "maxWillingToPay": "60"
                                
                            },{
                                "name": "Leif Meister",
                                "riderID": "2", 
                                "startAddress": "3232 Fake Ln, La Mesa, CA 92110",
                                "startGeopoint": "32.771139, -117.030657", // (lon,lat) 
                                "destAddress": "1001 Western Ave, Seattle, WA 98104",
                                "destGeopoint": "47.604322, -122.337528", 
                                "startDate": "04/22/2016",
                                "startAfterTime": "06:00pm", 
                                "startBeforeTime": "07:30pm",
                                "seatsRequired": "1", 
                                "roundTrip": false, 
                                "haveDog": false, 
                                "maxWillingToPay": "65"
                            },{
                                "name": "Bongo Ripper",
                                "riderID": "3", 
                                "startAddress": "3537 Wightman St, San Diego, CA 92104",
                                "startGeopoint": "32.747845, -117.117068", // (lon,lat) 
                                "destAddress": "1436 SE Taylor St, Portland, OR 97214",
                                "destGeopoint": "45.514932, -122.650998", 
                                "startDate": "04/22/2016",
                                "startAfterTime": "06:00pm", 
                                "startBeforeTime": "07:30pm",
                                "seatsRequired": "1", 
                                "roundTrip": false, 
                                "haveDog": false, 
                                "maxWillingToPay": "75" 
                            }];
}]);