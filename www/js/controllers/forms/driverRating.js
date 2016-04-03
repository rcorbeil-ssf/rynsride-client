angular.module('starter.controllers')
    .controller('DriverRatingCtrl', ['$scope', '$state', 'getRiderData', "SSFTranslateService", function($scope, $state, getRiderData, SSFTranslateService) {
        // set the rate and max variables

        $scope.rating = {};
        $scope.rating.default = 3;
        $scope.rating.max = 5;
        $scope.rating.comments = "";

        

        
        $scope.fakeUser = getRiderData;
        

        $scope.submitRating = function() {
            //TODO: What happens when you click submit? Include: Person your rating's ID, comment, and rating.default to the BACKEND...
            //1. How does service for pulling info from backend differ to pushing info to Backend???
            console.log($scope.rating);
            return $state.go("lobby");
        };
    }]);
    // 3) When 'Submit' is clicked, the rating and comment are sent to the ReservationService to 
    //forward to the backend.
    //I need to have the drivers photo and name provided by some service.
    // 4) It then goes to the Lobby page.




