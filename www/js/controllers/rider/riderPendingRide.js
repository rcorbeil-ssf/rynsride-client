angular.module('starter.controllers')
    .controller('RiderPendingRideCtrl', ['$scope', '$state', '$ionicHistory', "UpdateUser", "SSFTranslateService", "getDriverData", "getTripInformation",
        function($scope, $state, $ionicHistory, UpdateUser, SSFTranslateService, getDriverData, getTripInformation) {
          
            $scope.pendingRiderCommit =  getDriverData;
            $scope.pendingRiderCommitInfo =  getTripInformation;
           
            $scope.cancel = function() {
                UpdateUser.riderPendingTripCanceled({state: "canceled"})
                    .then(function(res) {
                            if (res.status === 200) {
                                $state.go("riderPage");
                            }
                            else{
                                //Handle what happens if there's an error
                            }
                        });
                    };
            }]);