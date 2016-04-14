angular.module('starter.controllers')

.controller('PostTripCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', '$window', 'PostedTripsService', '$ionicModal', 'SSFGeolocationService',
    function($scope, $state, $ionicHistory, SSFTranslateService, $window, PostedTripsService, $ionicModal, SSFGeolocationService) {

        $scope.postedTrip = {};
        $scope.newTrip = {};

        $scope.locationAllowed = function() {
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var currentGeoPoint = {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                };                
                
                SSFGeolocationService.reverseGeocode(currentGeoPoint)
                .then(function(address){
                    console.log(address);
                    var arrayOfStrings = address.split(", ");
                    var stateZip = arrayOfStrings[2].split(" ");
                    $scope.newTrip.startAddress = {
                        street: arrayOfStrings[0],
                        city: arrayOfStrings[1],
                        state: stateZip[0],
                        zip: stateZip[1]
                    };
                }, function(error){
                    console.log(error);
                });

                // obtained by geocoding the startAddress
                $scope.postedTrip.startGeopoint = {};
                // obtained by geocoding the destAddress
                $scope.postedTrip.destGeopoint = {};
                
                $scope.postTrip = function(form) {
                    if (form.$invalid) {
                        return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
                    }
                    else {
                        $scope.postedTrip = $scope.newTrip;
                        
                        var UTCstring = $scope.postedTrip.startTime.toUTCString();
                        var parsedMsecs = Date.parse(UTCstring);
                        
                        $scope.postedTrip.startTime = parsedMsecs;
                        console.log($scope.postedTrip.startTime);
                        console.log($scope.postedTrip.startDate);
                        
                        $scope.postedTrip.driverId = $window.localStorage.userId;
                        $scope.postedTrip.state = "new";
                        var startAddressString = 
                            $scope.newTrip.startAddress.street + ", " +
                            $scope.newTrip.startAddress.city + ", " +
                            $scope.newTrip.startAddress.state + " " +
                            $scope.newTrip.startAddress.zip;
                        var destAddressString = 
                            $scope.newTrip.destAddress.street + ", " +
                            $scope.newTrip.destAddress.city + ", " +
                            $scope.newTrip.destAddress.state + " " +
                            $scope.newTrip.destAddress.zip;
                            
                            SSFGeolocationService.geocodeAddress(startAddressString)
                            .then(function(response){
                                console.log("lat = " + response.lat + "; Lon = " + response.lng);
                                $scope.postedTrip.startGeopoint = response;

                                SSFGeolocationService.geocodeAddress(destAddressString)
                                .then(function(response){
                                    console.log("lat = " + response.lat + "; Lon = " + response.lng);
                                    $scope.postedTrip.destGeopoint = response;
                                    
                                    PostedTripsService.postTripData($scope.postedTrip);
                                }, function(error){
                                    console.log(error);
                                });                            
                                 
                                
                            }, function(error){
                                console.log(error);
                            });                            

                        //PostedTripsService.postTripData($scope.postedTrip);
                        console.log($scope.postedTrip);
                        console.log($scope.newTrip);
                        $state.go('driver');
                        $scope.newTrip = {};
                        
                    }
                };

            });
        };
        $scope.locationAllowed();
        
        $scope.newTrip = {
            startDate: new Date()
        };

        $ionicModal.fromTemplateUrl('startModal.html', function($ionicModal) {
            $scope.startModal = $ionicModal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $ionicModal.fromTemplateUrl('endModal.html', function($ionicModal) {
            $scope.endModal = $ionicModal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope.insertStart = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            }
            else {
                $scope.startModal.hide();
            }
        };

        $scope.insertEnd = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            }
            else {
                $scope.endModal.hide();
            }
        };

    }
]);
