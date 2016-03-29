angular.module('starter.controllers')
.controller('DriverRatingCtrl', function($scope, $state) {
   // set the rate and max variables
   
  $scope.rating = {};
  $scope.rating.default = 3;
  $scope.rating.max = 5;
  $scope.rating.comments = "";
  
//  1) Upon entering this page, the controller must make a request of the ReservationService for the
//	tripId corresponding to the saved ride.  It obtains the riderId from the tripID TripService,then
//	obtains the Rider name and photo from the UserService. 
// 2) It displays this info.
  
  //TODO: I need to have the riders information provided by some service
   $scope.fakeUser = {
        name: 'Ryan',
        age: '27',
        gender: 'Male',
        pickupTime: '6:00 pm',
        pickupLoc: 'San Diego',
        dropoffLoc: 'Corona',
        image:"https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D"
    };
  
  $scope.submitRating = function() {
    //TODO: What happens when you click submit? Include: Person your rating's ID, comment, and rating.default to the BACKEND...
    console.log($scope.rating);
    return $state.go("lobby");
  };
});
// 3) When 'Submit' is clicked, the rating and comment are sent to the ReservationService to 
//forward to the backend.
//I need to have the drivers photo and name provided by some service.
// 4) It then goes to the Lobby page.
/*

//Mock service
.service('RatingsService', function () {
        var service = this;
        var questions = [];
        service.setRatings = function(serverRatings)
        {
            ratings = serverRatings;
        };
        service.getRating = function(questionID)
        {
            var results = [];
            questions.forEach(function(question){
            //Search for ratings with the specified rating ID
                if(rating.Rating_Number == ratingID)
                    results.push(rating);
            }); 
            return results;
        };
        service.ratingsLength = function(){
            return ratings.length;
        };
    })
*/

