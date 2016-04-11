angular.module('starter.controllers')

.controller('RequestRideCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', 'RideRequestsService', '$window', '$ionicModal',
    function($scope, $state, $ionicHistory, SSFTranslateService, RideRequestsService, $window, $ionicModal) {

        $scope.rideArray = [];

        $scope.rideRequest = {
            // "riderId": "2",
            // "startAddress": {
            //     "street": "10 Goose Lane",
            //     "city": "SD",
            //     "state": "CA",
            //     "zip": "90020"
            // },
            // "startGeopoint": {
            //     "lat": 32,
            //     "lng": -117
            // },
            // "destAddress": {
            //     "street": "8 Main St.",
            //     "city": "Solana Beach",
            //     "state": "CA",
            //     "zip": "94320"
            // },
            // "destGeopoint": {
            //     "lat": 33,
            //     "lng": -116
            // },
            // "startDate": "2016-03-30",
            // "startTime": 0,
            // "seatsRequired": 1,
            // "needRoundTrip": false,
            // "sameGender": false,
            // "ageRange": "18-80",
            // "likesDogs": true,
            // "bike": false,
            // "wheelchair": false,
            // "beenRated": false,
            // "state": "new",
        };

        $scope.requestRide = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            }
            else {
                $scope.rideRequest = $scope.newRide;
                $scope.rideRequest.riderId = $window.localStorage.userId;
                RideRequestsService.postRideData($scope.rideRequest);
                console.log($scope.postedTrip);
                console.log($scope.newRide);
                $scope.newRide = {};
                $state.go('rider');
            }
        };

        // $scope.newRide = {
        //     rideDate: new Date(),
        // };

        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("date")[0].setAttribute('min', today);


        $ionicModal.fromTemplateUrl('pickupModal.html', function($ionicModal) {
            $scope.pickupModal = $ionicModal;
        }, {
            // Use our scope for the scope of the modal to keep it simple
            scope: $scope,
            // The animation we want to use for the modal entrance
            animation: 'slide-in-up'
        });  
        
        $ionicModal.fromTemplateUrl('dropoffModal.html', function($ionicModal) {
            $scope.dropoffModal = $ionicModal;
        }, {
            // Use our scope for the scope of the modal to keep it simple
            scope: $scope,
            // The animation we want to use for the modal entrance
            animation: 'slide-in-up'
        });  
        
        $scope.insertPickup = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM"); 
            } else {
                $scope.pickupModal.hide();
            }
        };
        
        $scope.insertDropoff = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM"); 
            } else {
                $scope.dropoffModal.hide();
            }
        };
    }
]);

// Request Ride page
// 	1) Upon entering this page the controller does not need to make any requests.
// 	2) If the 'Submit' button is clicked, the controller saves the ride in the RideService
//     and goes to the Rider page.
// 	3) If a tab is clicked we go to the appropriate page.