angular.module('starter.controllers')
    .controller('RiderRatingCtrl', ['$scope', '$state', 'getDriverData', "SSFTranslateService", 'GetDriverInfoService',   function($scope, $state, getDriverData, SSFTranslateService, GetDriverInfoService) {
        // set the default rating and max variables
        $scope.rating = {};
        $scope.rating.default = 3;
        $scope.rating.max = 5;
        $scope.rating.comments = "";

        
        
        $scope.fakeUser = getDriverData;
        $scope.submitRating = function(rating, comment) {
            // 1.) When 'Submit' is clicked, the rating and comment are sent to the ratingService to 
            //forward to the backend.
            // 2.) It then goes to the Lobby page.            
            //TODO: What happens when you click submit? Include: Person your rating's ID, comment, and rating.default to the BACKEND...
            console.log($scope.rating);
            $state.go("lobby");
        };
       $scope.translateConfirm= function(err) {
                                if (err.status == 422) {
                                    SSFTranslateService.showConfirm('DRIVER_RESERVED_RIDE.CANCEL.WARNING', 'DRIVER_RESERVED_RIDE.START.PROMPT')
                                        .then(function(res) {
                                            if (res == true) {}
                                            return {};
                                        });
                                }
                            };
    }]);

