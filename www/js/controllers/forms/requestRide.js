angular.module('starter.controllers')

.controller('RequestRideCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', 'RideRequestsService', '$window', '$ionicModal',
    function($scope, $state, $ionicHistory, SSFTranslateService, RideRequestsService, $window, $ionicModal) {

        $scope.rideArray = [];

        $scope.rideRequest = {};

        $scope.requestRide = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            }
            else {
                $scope.rideRequest = $scope.newRide;
                $scope.rideRequest.riderId = $window.localStorage.userId;
                $scope.rideRequest.state = "new";
                RideRequestsService.postRideData($scope.rideRequest);
                console.log($scope.newRide);
                $scope.newRide = {};
                $state.go('rider');
            }
        };

        $scope.newRide = {
            rideDate: new Date(),
        };

        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("startDate")[0].setAttribute('min', today);


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