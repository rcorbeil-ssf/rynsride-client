angular.module('starter.controllers')
.controller('PostTripCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', 'ionicDatePicker',
    function($scope, $state, $ionicHistory, SSFTranslateService, ionicDatePicker) {
    
    
        $scope.tripArray = [];
    
        $scope.postTrip = function(form) {
            if(form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            } else {
                $scope.tripArray.push();
                $state.go('driver');
            }
        };
        
        // $scope.prepop = function() {
        //     var date = new Date().toISOString().substring(0, 10),
        //     field = document.querySelector('#date');
        //     field.value = date;
        // };
        
        $scope.newTrip = {
            tripDate: new Date()
        };

        var ipObj1 = {
              callback: function (val) {  
                $scope.newTrip.tripDate = new Date(val);
              },
              from: new Date(2016, 1, 1),
              to: new Date(2020, 12, 31),
              mondayFirst: false,
              closeOnSelect: true,
              templateType: 'popup'
            };
        
        $scope.openDatePicker = function(){
          ipObj1.inputDate = $scope.newTrip.tripDate;
          ionicDatePicker.openDatePicker(ipObj1);
        };

    }
]);

// Post Trip page
// 	1) Upon entering this page the controller does not need to make any requests.
// 	2) If the 'Submit' button is clicked, the controller saves the trip in the RideService
//     and goes to the Driver page.
// 	4) If a tab is clicked we go to the appropriate page.