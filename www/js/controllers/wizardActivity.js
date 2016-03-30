angular.module('starter.controllers')

.controller('WizardActivityCtrl', ['$scope', '$rootScope', '$translate', '$state', '$ionicPopup', 'SSFTranslateService', "$translate", "ActivityService", "$window", function($scope, $rootScope, $translate, $state, $ionicPopup, SSFTranslateService, $translate, ActivityService, $window) {

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
        return SSFTranslateService.showConfirm("ERROR.TITLE", "ERROR.SOME_RETRY_ERROR")
            .then(function(res) {
                if (res)
                    $scope.getActivityInfo();
            });
    };

    $scope.getActivityInfo = function() {

        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);
            var geoPoint = {
                lon: position.coords.longitude,
                lat: position.coords.latitude
            };
            ActivityService.getActivityInfo($window.localStorage['token'], geoPoint)
                .then(function(response) {
                    if (response.status === 200) {
                        $scope.rides = response.data;
                    }
                    else if (response.data !== 401) {
                        // invalid response
                        $scope.retryActivity();
                    }
                }, 
                function(response) {
                    // something went wrong
                    $scope.retryActivity();
                });
        });


    };
    
    $scope.getActivityInfo();

}]);