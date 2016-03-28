angular.module('starter.controllers')
.controller('DriverTripDetailsCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate) {
            /*  doing a service.all to get the information for trip. need to go into Trip model path
                when response == 200, $scope.tripDetails = response.data
                going to need a way to get a screenshot of the trip map (if possible, but not needed.)
            */
            $scope.tripDetails = {
                driverID : "122",
                startAddress: "1748 San Diego Ave, San Diego, CA 92110", //(JSON object)
            	startGeopoint: "32.743414, -117.182739", // (lon,lat)
            	destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)
            	destGeopoint: "47.609561, -122.341505",
            	startDate: "4/22/2016",
                startTime: "06:00pm",
            	expectedEndTime: "06:00am",
            	seatsAvailable: 2,
            	roundTrip: "true",
            	dogOK: "false",
            	estimatedSharedExpense: "20",
            	mapImage: "https://s-media-cache-ak0.pinimg.com/236x/90/d4/8d/90d48d04314f049bee1216cb389396a5.jpg"
            };
}]);