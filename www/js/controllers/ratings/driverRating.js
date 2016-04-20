angular.module('starter.controllers')
    .controller('DriverRatingCtrl', ['$scope', '$state','RatingService', "SSFTranslateService", "RiderTripDetailsService", function($scope, $state, RatingService, SSFTranslateService, RiderTripDetailsService) {
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
       
        // $scope.fakeUser = getRiderData;
        
        

        $scope.submitRating = function() {
            //TODO: What happens when you click submit? Include: Person your rating's ID, comment, and rating.default to the BACKEND...
            //1.) How does service for pulling info from backend differ to pushing info to Backend???
            //2.) When 'Submit' is clicked, the rating and comment are sent to the ratingService to 
            //forward to the backend.
            console.log($scope.rating);
            return $state.go("lobby");
        };
    }]);
    
    



