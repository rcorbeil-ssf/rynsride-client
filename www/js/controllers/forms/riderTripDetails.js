angular.module('starter.controllers')

.controller('RiderTripDetailsCtrl', ['$scope', '$rootScope', '$translate', '$state', function($scope, $rootScope, $translate, $state) {

    $scope.logout = function() {
        $rootScope.$broadcast('request:auth');
    };

    $scope.commit = function() {
        $state.go('riderPage');
    };

    $scope.editable = function(prePop) {
        if (prePop === undefined || prePop === null || prePop === '') {
            return false;
        }
        else return true;
    };

    //     RiderTripDetails page
    // 	1) Upon entering this page the controller must get from the TripService the trip in question.
    // 	   It will use this trip info to display the trip details.  To display the user name, age, gender
    // 	   it will need to make a request of the UserService to retrieve this info from the backend.
    // 	2) When the 'Commit' button is clicked, we go to the Rider page (Requested Rides)


    // FAKE USER DATA
    $scope.fakeUser = {
        name: 'Ryan',
        age: '27',
        gender: 'Male',
        startTime: '6:00 pm',
        pickupLoc: '',
        // dropoffLoc: 'Corona',
        image: 'http://2.bp.blogspot.com/_XU9x8G7khv0/TKOIgBoUI7I/AAAAAAAAQxk/kkPW62mXBjg/s1600/timallen78mug1.jpg'
    };

    // FAKE PREFERENCES DATA
    $scope.preferences = [{
        text: "Wheelchair Accessible?",
        checked: true
    }, {
        text: "Pets Allowed?",
        checked: false
    }, {
        text: 'Other Option 1',
        checked: false
    }, {
        text: 'Other Option 2',
        checked: true
    }];


}]);