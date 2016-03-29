angular.module('starter.controllers')
    .controller('DriverRatingCtrl', function($scope, $state) {
        // set the rate and max variables
        $scope.rating = {};
        $scope.rating.rate = 3;
        $scope.rating.max = 5;

        $scope.checkRating = function() {
            console.log($scope.rating.rate);
            return $state.go("lobby");
        };
    });

//I need to have the drivers photo and name provided by some service.


//rider rating and driver page
//when he clicks submit I need to add to my html ng submit click, which will send the info to the backend