angular.module('starter.controllers')
    .controller('DriverRatingCtrl', ['$scope', '$state','RatingService',"RatingsService", "SSFTranslateService", "RiderTripDetailsService",
    function($scope, $state, RatingService, SSFTranslateService, RiderTripDetailsService, RatingsService) {
        // set the default rating and max variables

        $scope.rating = {};
        $scope.rating.default = 3;
        $scope.rating.max = 5;
        $scope.rating.comments = "";
        //This is the driver rating the rider
        
        $scope.modal = function($event, who) {
            SSFTranslateService.translate("RATING.DRIVER_RATING") //service
                .then(function(res) {
                    RatingService.rate($event, $scope, res, who); //service
                });
                };
                 $scope.fakeUser = RiderTripDetailsService.currentRide();
        $scope.submitRating = function() {
            RatingsService.postRating()
            RatingsService.postComment()
            
            console.log($scope.rating);
            return $state.go("lobby");
        };
    }]);