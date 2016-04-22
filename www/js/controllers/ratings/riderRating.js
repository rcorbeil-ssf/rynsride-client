angular.module('starter.controllers')
    .controller('RiderRatingCtrl', ['$scope', '$state',  "SSFTranslateService",  "getDriverInfo", "RatingService", "RatingsService",
    function($scope, $state,  SSFTranslateService,  getDriverInfo, RatingService, RatingsService) {
        // set the default rating and max variables
        $scope.rating = {};
        $scope.rating.default = 3;
        $scope.rating.max = 5;
        $scope.rating.comments = "";
        
        $scope.fakeUser =  getDriverInfo;
        
        $scope.submitRating = function(rating, comment) {
            console.log($scope.rating);
            RatingsService.postComment;
            RatingsService.postRating;
            $state.go("lobby");
        };
            
        $scope.modal = function($event, who) {
            SSFTranslateService.translate("RATING.DRIVER_RATING") //service
                .then(function(res) {
                    RatingService.rate($event, $scope, res, who); //service
                });
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

