angular.module('starter.controllers')

.controller('PostTripCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService',
    '$window', 'PostedTripsService', '$ionicModal', 'SSFGeolocationService',
    function($scope, $state, $ionicHistory, SSFTranslateService, $window, PostedTripsService,
    $ionicModal, SSFGeolocationService) {

        $scope.$on('$ionicView.enter', function(event, data) {
            // code to run each time view is entered
            $scope.postedTrip = {};
            $scope.newTrip = {};
            
            $scope.newTrip.startAddress = JSON.parse($window.localStorage.curPos);
            $scope.newTrip.startAddressString = 
                    $scope.newTrip.startAddress.street + ", " +
                    $scope.newTrip.startAddress.city + ", " +
                    $scope.newTrip.startAddress.state + " " +
                    $scope.newTrip.startAddress.zip;
                    
            $scope.newTrip.destAddress = {};
            
            initialize();
        });
        
        var startInput;
        var startAutocomplete;
        var destInput;
        var destAutocomplete;
        var startAddressString = '';
        var destAddressString = '';
        
        function initialize() {
            startInput = document.getElementById('startLocation');
            startAutocomplete = new google.maps.places.Autocomplete(startInput);
            destInput = document.getElementById('destLocation');
            destAutocomplete = new google.maps.places.Autocomplete(destInput);
        }
        
        function fillInStartAddress() {
          // Get the place details from the autocomplete object.
          var place = startAutocomplete.getPlace();
          if(place != undefined && place.formatted_address != undefined){
              startAddressString = place.formatted_address;
              $scope.newTrip.startAddressString = startAddressString;
              
              if(place.address_components != undefined){
                if(place.address_components.length >= 7){
                  $scope.postedTrip.startAddress.street = place.address_components[0].short_name +" " +
                        place.address_components[1].short_name;
                  $scope.postedTrip.startAddress.city = place.address_components[2].short_name;
                  $scope.postedTrip.startAddress.state = place.address_components[4].short_name;
                  $scope.postedTrip.startAddress.zip = place.address_components[6].short_name;
                 }
                else if(place.address_components.length == 4){
                  $scope.postedTrip.startAddress.street = "";
                  $scope.postedTrip.startAddress.city = place.address_components[0].short_name;
                  $scope.postedTrip.startAddress.state = place.address_components[2].short_name;
                  $scope.postedTrip.startAddress.zip = "";
                }
                //TODO account for other arrangements
              }
          }
          else {
              startAddressString = $scope.newTrip.startAddressString;
          }
        }

        function fillInDestAddress() {
          // Get the place details from the autocomplete object.
          var place = destAutocomplete.getPlace();
          if(place != undefined && place.formatted_address != undefined){
              destAddressString = place.formatted_address;
              
              if(place.address_components != undefined){
                if(place.address_components.length >= 7){
                  $scope.postedTrip.destAddress.street = place.address_components[0].short_name +" " +
                        place.address_components[1].short_name;
                  $scope.postedTrip.destAddress.city = place.address_components[2].short_name;
                  $scope.postedTrip.destAddress.state = place.address_components[4].short_name;
                  $scope.postedTrip.destAddress.zip = place.address_components[6].short_name;
                 }
                else if(place.address_components.length == 4){
                  $scope.postedTrip.destAddress.street = "";
                  $scope.postedTrip.destAddress.city = place.address_components[0].short_name;
                  $scope.postedTrip.destAddress.state = place.address_components[2].short_name;
                  $scope.postedTrip.destAddress.zip = "";
                }
                //TODO account for other arrangements
              }
          }
        }

        $scope.postTrip = function(form) {
          if(form.$invalid) {
              alert('fill in all fields');
              if(navigator.notification.alert == undefined){
                  alert('undefined');
              }
              else{
                  alert('defined');
              }
              return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
          } else {
                $scope.postedTrip = $scope.newTrip;

                // obtained by geocoding the startAddress
                $scope.postedTrip.startGeopoint = {};
                // obtained by geocoding the destAddress
                $scope.postedTrip.destGeopoint = {};
                
                var UTCstring = $scope.postedTrip.startTime.toUTCString();
                var parsedMsecs = Date.parse(UTCstring);
                $scope.postedTrip.startTime = parsedMsecs;
                $scope.postedTrip.timeZoneOffset = new Date().getTimezoneOffset();
                
                // UTCstring = $scope.postedTrip.estEndTime.toUTCString();
                // parsedMsecs = Date.parse(UTCstring);
                // $scope.postedTrip.estEndTime = parsedMsecs;
                
                $scope.postedTrip.driverId = $window.localStorage.userId;
                $scope.postedTrip.state = "new";

                fillInStartAddress();
                fillInDestAddress();
                
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
