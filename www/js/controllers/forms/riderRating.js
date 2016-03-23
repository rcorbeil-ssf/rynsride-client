angular.module('starter.controllers')
.controller('RiderRatingCtrl', function($scope) {
   // set the rate and max variables
  $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;
  
  $scope.checkRating = function() {
    console.log($scope.rating);
  };
})