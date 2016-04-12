angular.module('starter.controllers')

.controller('PostTripCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', '$window', 'PostedTripsService', '$ionicModal',
    function($scope, $state, $ionicHistory, SSFTranslateService, $window, PostedTripsService, $ionicModal) {
    
        $scope.tripArray = [];
        
        $scope.postedTrip = {};
        
        $scope.postTrip = function(form) {
            if(form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            } else {
                $scope.postedTrip = $scope.newTrip;
                $scope.postedTrip.driverId = $window.localStorage.userId;
                $scope.postedTrip.state = "new";
                PostedTripsService.postTripData($scope.postedTrip);
                console.log($scope.postedTrip);
                console.log($scope.newTrip);
                $state.go('driver');
                $scope.newTrip = {};
            }
        };
        
        $scope.newTrip = {
            startDate: new Date()
        };

        // 
        // 
        
        $ionicModal.fromTemplateUrl('startModal.html', function($ionicModal) {
            $scope.startModal = $ionicModal;
        }, {
            // Use our scope for the scope of the modal to keep it simple
            scope: $scope,
            // The animation we want to use for the modal entrance
            animation: 'slide-in-up'
        });  
        
        $ionicModal.fromTemplateUrl('endModal.html', function($ionicModal) {
            $scope.endModal = $ionicModal;
        }, {
            // Use our scope for the scope of the modal to keep it simple
            scope: $scope,
            // The animation we want to use for the modal entrance
            animation: 'slide-in-up'
        });  
        
        $scope.insertStart = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM"); 
            } else {
                $scope.startModal.hide();
            }
        };
        
        $scope.insertEnd = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM"); 
            } else {
                $scope.endModal.hide();
            }
        };

    }
]);

// Post Trip page
// 	1) Upon entering this page the controller does not need to make any requests.
// 	2) If the 'Submit' button is clicked, the controller saves the trip in the RideService
//     and goes to the Driver page.
// 	4) If a tab is clicked we go to the appropriate page.