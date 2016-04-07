angular.module('starter.controllers')
    .controller('RiderReservedRideCtrl', ['$scope', '$state', '$ionicHistory', "UpdateUser", "getDriverData", "getTripInformation",
        function($scope, $state, $ionicHistory, UpdateUser, getDriverData, getTripInformation) {
            $scope.user = getDriverData;
            $scope.fakeRide = getTripInformation;
            
            $scope.cancel = function() {
                UpdateUser.riderPendingTripCanceled({
                        state: "canceled"
                    })
                    .then(function(res) {
                        if (res.status === 200) {
                            $state.go("rider");
                        }
                        else {
                            //Need to handle an error 
                        }
                    });
            };
            $scope.driverNoShow = function() {
                UpdateUser.riderPendingTripCanceled({
                        state: "canceled"
                    })
                    .then(function(res) {
                        if (res.status === 200) {
                            $state.go("riderRating");
                        }
                        else {
                            //Need to handle an error
                        }
                    });
            };
            /*3. When finished ride clicked on it will take them to the driver rating page*/
            $scope.finish = function() {
                UpdateUser.riderPendingTripCanceled({
                        state: "finished"
                    })
                    .then(function(res) {
                        if (res.status === 200) {
                            $state.go("riderRating");
                        }
                        else {
                            //Need to handle an error 
                        }
                    });
            };
        }
    ]);