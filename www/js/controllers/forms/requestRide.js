angular.module('starter.controllers')
.controller('RequestRideCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService',
    function($scope, $state, $ionicHistory, SSFTranslateService) {
    
        
        $scope.rideArray = [];
    
        $scope.requestRide = function(form) {
            if(form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            } else {
                $scope.rideArray.push();
                $state.go('rider');
            }
        };
    
    }
]);

// Request Ride page
// 	1) Upon entering this page the controller does not need to make any requests.
// 	2) If the 'Submit' button is clicked, the controller saves the ride in the RideService
//     and goes to the Rider page.
// 	4) If a tab is clicked we go to the appropriate page.