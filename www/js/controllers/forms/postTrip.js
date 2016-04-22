angular.module('starter.controllers')

.controller('PostTripCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService',
    '$window', 'PostedTripsService', '$ionicModal', 'SSFGeolocationService',
    function($scope, $state, $ionicHistory, SSFTranslateService, $window, PostedTripsService,
    $ionicModal, SSFGeolocationService) {

        $scope.$on('$ionicView.enter', function() {
            // code to run each time view is entered
            $scope.postedTrip = {};
            $scope.newTrip = {};
            $scope.newTrip.startAddress = JSON.parse($window.localStorage.curPos);
        });
        
        $scope.postTrip = function(form) {
          if(form.$invalid) {
              return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
          } else {
                // obtained by geocoding the startAddress
                $scope.postedTrip.startGeopoint = {};
                // obtained by geocoding the destAddress
                $scope.postedTrip.destGeopoint = {};
                
                $scope.postedTrip = $scope.newTrip;
                
                var UTCstring = $scope.postedTrip.startTime.toUTCString();
                var parsedMsecs = Date.parse(UTCstring);
                $scope.postedTrip.startTime = parsedMsecs;
                
                UTCstring = $scope.postedTrip.estEndTime.toUTCString();
                parsedMsecs = Date.parse(UTCstring);
                $scope.postedTrip.estEndTime = parsedMsecs;
                
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
                        
                        PostedTripsService.postTripData($scope.postedTrip, $window.localStorage.token)
                        .then(function(res){
                            console.log($scope.postedTrip);
                            console.log($scope.newTrip);
                            $scope.newTrip = {};
                            $state.go('driver', {}, {reload: true});
                        }, function(error){
                        console.log(error);
                    });
                    }, function(error){
                        console.log(error);
                    });                            
                     
                    
                }, function(error){
                    console.log(error);
                });
            }
        };
        
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
