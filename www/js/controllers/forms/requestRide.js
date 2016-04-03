angular.module('starter.controllers')
.controller('RequestRideCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', 'ionicDatePicker',
    function($scope, $state, $ionicHistory, SSFTranslateService, ionicDatePicker) {
    
        $scope.rideArray = [];
    
        $scope.requestRide = function(form) {
            if(form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            } else {
                $scope.rideArray.push();
                $state.go('rider');
            }
        };
        
        $scope.newRide = {
            rideDate: new Date()
        };

        var ipObj1 = {
            callback: function (val) {  //Mandatory
                $scope.newRide.rideDate = new Date(val);
            },
            from: new Date(2016, 1, 1), //Optional
            to: new Date(2020, 12, 31), //Optional
            mondayFirst: false,          //Optional
            closeOnSelect: true,       //Optional
            templateType: 'popup'       //Optional
        };
        
        $scope.openDatePicker = function() {
            ipObj1.inputDate = $scope.newRide.rideDate;
            ionicDatePicker.openDatePicker(ipObj1);
        };
            
    }
]);

// Request Ride page
// 	1) Upon entering this page the controller does not need to make any requests.
// 	2) If the 'Submit' button is clicked, the controller saves the ride in the RideService
//     and goes to the Rider page.
// 	3) If a tab is clicked we go to the appropriate page.