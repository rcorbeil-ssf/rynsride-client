angular.module('starter.controllers')

.controller('WizardActivityCtrl', ['$scope', '$rootScope', '$translate', '$state', '$ionicPopup', 'SSFTranslateService', "ActivityService", "$window", "locationBlocked",  
    function($scope, $rootScope, $translate, $state, $ionicPopup, SSFTranslateService, ActivityService, $window, locationBlocked) {

      

        
        
        $scope.goTo = function() {
            $state.go("login");
        };

        $scope.showAlert = function() {
            SSFTranslateService.showAlert('WIZARD_ACTIVITY.SIGN_IN', 'WIZARD_ACTIVITY.CLICK_BELOW', 'WIZARD_ACTIVITY.GET_STARTED')
                .then(function(res) {
                    console.log(res);
                    $scope.goTo();
                });
        };

        $scope.retryActivity = function() {
            return SSFTranslateService.showAlert("ERROR.TITLE", "")
                .then(function(res) {
                    if (res)
                        $scope.locationAllowed();
                });
        };
        // $scope.location = function(){
        //     LocationService.location
        // };
        

        $scope.locationAllowed = function() {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords.latitude, position.coords.longitude);
                var geopoint = {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                };
                ActivityService.locationAllowed(geopoint)
                    .then(function(response) {
                            if (response.status === 200) {
                                $scope.rides = response.data;
                                console.log('Allowed');
                            }
                            else {
                                // invalid response
                                // $scope.retryActivity();
                                console.log('Status not 200');
                            }
                        },
                        function(response) {
                            // something went wrong
                            // $scope.retryActivity();
                        });
            }, function(error) {
                if (error.code === error.PERMISSION_DENIED) {
                    $window.localStorage.locationAllowed = false;
                    SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.SOME_RETRY_ERROR");
                    $scope.rides = locationBlocked;
                  
                    console.log("Blocked");
                }
            });
            console.log('Always called');
        };
        $scope.locationAllowed();

    }
]);
