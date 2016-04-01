angular.module('starter.controllers')
    .controller('RiderPendingRideCtrl', ['$scope', '$state', '$ionicHistory', "UpdateUser", "SSFTranslateService", "getDriverData", "getTripInformation",
        function($scope, $state, $ionicHistory, UpdateUser, SSFTranslateService, getDriverData, getTripInformation) {
            /*1. Will need to get trip from backend by id
              Also will need to populate form from backend*/
            $scope.pendingRiderCommit =  getDriverData;
            $scope.pendingRiderCommitInfo =  getTripInformation;
            // {
            //     startDate: "May 3",
            //     profilePicture: "Pending",
            //     name: "Ryan M",
            //     age: "27",
            //     gender: "Male",
            //     requestedPickUpTime: "7:30 PM",
            //     requestedPickUpLocation: "Soft Stack Factory",
            //     requestedDropOffLocation: "Lucha Libre",
            //     image: "https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D"
            // };
            /*2. This needs to pull the ride and change the state to canceled from the back end*/
            $scope.cancel = function() {
                UpdateUser.riderPendingTripCanceled({state: "canceled"})
                    .then(function(res) {
                            if (res.status === 200) {
                                $state.go("riderPage");
                            }
                            else{
                                //Handle what happens if there's an erro
                            }
                        });
                    };
            }]);