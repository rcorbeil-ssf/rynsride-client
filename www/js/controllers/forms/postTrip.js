angular.module('starter.controllers')
.controller('PostTripCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', 'ionicDatePicker', '$window', 'PostedTripsService',
    function($scope, $state, $ionicHistory, SSFTranslateService, ionicDatePicker, $window, PostedTripsService) {
    
    
        $scope.tripArray = [];
        
        $scope.postedTrip = {
            // "driverId": "1",
            "startAddress": { "street": "111 San Diego Avenue", "city":"SD", "state": "CA", "zip": "90020"},
            "startGeopoint": {
              "lat": 32,
              "lng": -117
            },
            "destAddress": { "street": "8 Main St.", "city":"Oceanside", "state": "CA", "zip": "94320"},
            "destGeopoint": {
              "lat": 33,
              "lng": -116
            },
            "startDate": "2016-03-30",
            "startTime": 0,
            "estEndTime": 0,
            "seatsAvailable": 1,
            "pickupRadius": 3,
            "isRoundTrip": false,
            "vehicleId": "1",
            "estSharedExpense": 10,
            "sameGender": true,
            "ageRange": "20-70",
            "likesDogs": true,
            "beenRated": false,
            "state": "new"
        };
    
        $scope.postTrip = function(form) {
            if(form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            } else {
                $scope.postedTrip.driverId = $window.localStorage.userId;
                PostedTripsService.postTripData($scope.postedTrip);
                // $scope.tripArray.push();
                $state.go('driver');
            }
        };
        
        // $scope.prepop = function() {
        //     var date = new Date().toISOString().substring(0, 10),
        //     field = document.querySelector('#date');
        //     field.value = date;
        // };
        
        $scope.newTrip = {
            tripDate: new Date()
        };

        var ipObj1 = {
              callback: function (val) {  
                $scope.newTrip.tripDate = new Date(val);
              },
              from: new Date(2016, 1, 1),
              to: new Date(2020, 12, 31),
              mondayFirst: false,
              closeOnSelect: true,
              templateType: 'popup'
            };
        
        $scope.openDatePicker = function(){
          ipObj1.inputDate = $scope.newTrip.tripDate;
          ionicDatePicker.openDatePicker(ipObj1);
        };

    }
]);

// Post Trip page
// 	1) Upon entering this page the controller does not need to make any requests.
// 	2) If the 'Submit' button is clicked, the controller saves the trip in the RideService
//     and goes to the Driver page.
// 	4) If a tab is clicked we go to the appropriate page.