angular.module('starter.controllers')

.controller('RiderTripDetailsCtrl', ['$scope', '$rootScope', '$translate', '$state', function($scope, $rootScope, $translate, $state) {

    $scope.logout = function() {
        $rootScope.$broadcast('request:auth');
    };
    
    $scope.commit = function() {
        $state.go('riderPage');
    };
    
    $scope.fakeUser = {
        name: 'Ryan',
        age: '27',
        gender: 'Male',
        pickupTime: '6:00 pm',
        pickupLoc: 'San Diego',
        dropoffLoc: 'Corona',
        image: 'http://2.bp.blogspot.com/_XU9x8G7khv0/TKOIgBoUI7I/AAAAAAAAQxk/kkPW62mXBjg/s1600/timallen78mug1.jpg'
    };

    $scope.preferences = [{
        text: "Wheelchair OK?",
        checked: true
    }, {
        text: "Dog OK?",
        checked: false
    }, {
        text: 'ASDF',
    }, {
        text: 'ASDF',
    }];

}]);