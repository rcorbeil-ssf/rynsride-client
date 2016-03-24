angular.module('starter.controllers')
.controller('RiderRatingCtrl', function($scope, $state) {
   // set the rate and max variables
  $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;
  $scope.comment = {};
  //TODO: I need to have the drivers photo and name provided by some service.
  
  $scope.submitRating = function() {
      
    //TODO: What happens when you click submit? Include: Person your rating's ID, comment, and rating.rate to the BACKEND...
    
    
    console.log($scope.rating);
    console.log($scope.comment);
    return $state.go("lobby");
  };
});





