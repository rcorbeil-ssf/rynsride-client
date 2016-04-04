angular.module('starter.controllers')

.controller('RequestRideCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', 'ionicDatePicker', 'RideRequestsService', '$window',
    function($scope, $state, $ionicHistory, SSFTranslateService, ionicDatePicker, RideRequestsService, $window) {

        $scope.rideArray = [];

        $scope.rideRequest = {
            // "riderId": "2",
            "startAddress": {
                "street": "10 Goose Lane",
                "city": "SD",
                "state": "CA",
                "zip": "90020"
            },
            "startGeopoint": {
                "lat": 32,
                "lng": -117
            },
            "destAddress": {
                "street": "8 Main St.",
                "city": "Oceanside",
                "state": "CA",
                "zip": "94320"
            },
            "destGeopoint": {
                "lat": 33,
                "lng": -116
            },
            "startDate": "2016-03-30",
            "startTime": 0,
            "seatsRequired": 1,
            "needRoundTrip": false,
            "sameGender": false,
            "ageRange": "18-80",
            "likesDogs": true,
            "bike": false,
            "wheelchair": false,
            "beenRated": false,
            "state": "new",
        };

        $scope.requestRide = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            }
            else {
                $scope.rideRequest.riderId = $window.localStorage.userId;
                RideRequestsService.postRideData($scope.rideRequest);
                // $scope.rideArray.push();
                $state.go('rider');
            }
        };

        $scope.newRide = {
            rideDate: new Date()
        };

        var ipObj1 = {
            callback: function(val) { //Mandatory
                $scope.newRide.rideDate = new Date(val);
            },
            from: new Date(2016, 1, 1), //Optional
            to: new Date(2020, 12, 31), //Optional
            mondayFirst: false, //Optional
            closeOnSelect: true, //Optional
            templateType: 'popup' //Optional
        };

        $scope.openDatePicker = function() {
            ipObj1.inputDate = $scope.newRide.rideDate;
            ionicDatePicker.openDatePicker(ipObj1);
        };

    }
]);

// Request Ride page
// 	1) Upon entering this page the controller does not need to make any requests.
// 	2) If the 'Submit' button is clicked, the controller saves the ride in the RideService
//     and goes to the Rider page.
// 	3) If a tab is clicked we go to the appropriate page.