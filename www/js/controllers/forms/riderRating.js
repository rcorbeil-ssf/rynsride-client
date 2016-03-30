angular.module('starter.controllers')
    .controller('RiderRatingCtrl', ['$scope', '$state', "SSFTranslateService", 'GetDriverInfoService',   function($scope, $state, SSFTranslateService, GetDriverInfoService) {
        // set the rate and max variables
        $scope.rating = {};
        $scope.rating.default = 3;
        $scope.rating.max = 5;
        $scope.rating.comments = "";
        
// 1) Upon entering this page, the controller must make a request of the ReservationService for the
//tripId corresponding to the saved ride.  It obtains the driverId from the tripID TripService,then
//obtains the driver name and photo from the UserService.
// 2) It displays this info.  
        //TODO: I need to have the drivers photo and name provided by some service. 
        // $scope.fakeUser = getDriverData;
        $scope.submitRating = function(rating, comment) {
// 3) When 'Submit' is clicked, the rating and comment are sent to the ReservationService to 
//forward to the backend.
// 4) It then goes to the Lobby page.            
            //TODO: What happens when you click submit? Include: Person your rating's ID, comment, and rating.default to the BACKEND...
            console.log($scope.rating);
            $state.go("lobby");
        };
    }]);


