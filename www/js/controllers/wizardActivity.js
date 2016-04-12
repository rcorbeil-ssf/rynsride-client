angular.module('starter.controllers')

.controller('WizardActivityCtrl', ['$scope', '$rootScope', '$translate', '$state', '$ionicPopup', 'SSFTranslateService', "ActivityService", "$window", "locationBlocked",
    function($scope, $rootScope, $translate, $state, $ionicPopup, SSFTranslateService, ActivityService, $window, locationBlocked) {

        //You need to pull the trips from the backend
        //1.we are going to send our geopoint to the backend and the backend will do a search
        //the backend will sort the data by date 
        //
        //2. We are going to display no more then 10 these trips in a list.
        //if the user is already logged in they can't come back to this page.
        //
        //it displays the trip details including date, time, and destination
        //you can click on the trip details but it will tell you to register and go to login
        //

      
        
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

        $scope.locationAllowed = function() {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords.latitude, position.coords.longitude);
                var geoPoint = {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                };

                ActivityService.locationAllowed(geoPoint)
                    .then(function(response) {
                            if (response.status === 200) {
                                $scope.rides = response.data;
                                console.log('Allowed');
                            }
                            else {
                                // invalid response
                                $scope.retryActivity();
                                console.log('Status not 200');
                            }
                        },
                        function(response) {
                            // something went wrong
                            $scope.retryActivity();
                        });
            }, function(error) {
                if (error.code === error.PERMISSION_DENIED) {
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
