angular.module('starter.controllers')

.controller('RequestRideCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', 'RideRequestsService', '$window', '$ionicModal','SSFGeolocationService',
    function($scope, $state, $ionicHistory, SSFTranslateService, RideRequestsService, $window, $ionicModal, SSFGeolocationService) {

        $scope.rideRequest = {};

        $scope.requestRide = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            }
            else {
                // obtained by geocoding the startAddress
                $scope.rideRequest.startGeopoint = {};
                // obtained by geocoding the destAddress
                $scope.rideRequest.destGeopoint = {};
                $scope.rideRequest = $scope.newRide;
                
                var UTCstring = $scope.rideRequest.pickupTime.toUTCString();
                var parsedMsecs = Date.parse(UTCstring);
                
                $scope.rideRequest.pickupTime = parsedMsecs;
                console.log($scope.rideRequest.pickupTime);
                console.log($scope.rideRequest.startDate);
                
                $scope.rideRequest.riderId = $window.localStorage.userId;
                $scope.rideRequest.state = "new";
                
                var startAddressString = 
                    $scope.rideRequest.startAddress.street + ", " +
                    $scope.rideRequest.startAddress.city + ", " +
                    $scope.rideRequest.startAddress.state + " " +
                    $scope.rideRequest.startAddress.zip;
                var destAddressString = 
                    $scope.rideRequest.destAddress.street + ", " +
                    $scope.rideRequest.destAddress.city + ", " +
                    $scope.rideRequest.destAddress.state + " " +
                    $scope.rideRequest.destAddress.zip;                
                
                    SSFGeolocationService.geocodeAddress(startAddressString)
                    .then(function(response){
                        console.log("lat = " + response.lat + "; Lon = " + response.lng);
                        $scope.rideRequest.startGeopoint = response;
    
                        SSFGeolocationService.geocodeAddress(destAddressString)
                        .then(function(response){
                            console.log("lat = " + response.lat + "; Lon = " + response.lng);
                            $scope.rideRequest.destGeopoint = response;
                            
                            RideRequestsService.postRideData($window.localStorage.token, $scope.rideRequest);
                        }, function(error){
                            console.log(error);
                        });                            
                         
                        
                    }, function(error){
                        console.log(error);
                    });                 
                
                console.log($scope.newRide);
                $scope.newRide = {};
                $state.go('rider', {}, {reload: true});
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