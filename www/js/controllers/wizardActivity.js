angular.module('starter.controllers')

.controller('WizardActivityCtrl', ['$scope', '$rootScope', '$translate', '$state', '$ionicPopup', 'SSFTranslateService', "$translate",  function($scope, $rootScope, $translate, $state, $ionicPopup, SSFTranslateService, $translate) {

//You need to pull the trips from the backend
//if the user is already logged in they can't come back to this page.
//Inside this controller you pull the history of trips
//it displays the trip details including date, time, and destination
//you can click on the trip details but it will tell you to register and go to login

    $scope.goTo = function(){
        $state.go("login");
    };
    $scope.showAlert = function() {
        SSFTranslateService.showAlert('WIZARD_ACTIVITY.SIGN_IN', 'WIZARD_ACTIVITY.CLICK_BELOW', 'WIZARD_ACTIVITY.GET_STARTED')
        .then(function(res) {
            console.log(res);
            $scope.goTo();
        });
    };
    $scope.tripDetails = function() {
        $state.go('riderTripDetails');
    };
    $scope.rides = [{
        startDate: "June 4",
        startLocation: "San Diego",
        endLocation: "San Diego"
    }, {
        startDate: "April 17",
        startLocation: "San Diego",
        endLocation: "San Diego"
    }, {
        startDate: "May 3",
        startLocation: "San Diego",
        endLocation: "San Diego"
    }, {
        startDate: "July 8",
        startLocation: "San Diego",
        endLocation: "San Diego"
    }];
}]);