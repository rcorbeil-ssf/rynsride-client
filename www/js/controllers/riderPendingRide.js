angular.module('starter.controllers')
    .controller('RiderPendingRideCtrl', ['$scope', '$state', '$ionicHistory',
        function($scope, $state, $ionicHistory) {


            /*1. Will need to get trip from backend by id
              Also will need to populate form from backend*/
            

            $scope.pendingRiderCommit = {
                startDate: "May 3",
                profilePicture: "Pending",
                name: "Ryan M",
                age: "27",
                gender: "Male",
                requestedPickUpTime: "7:30 PM",
                requestedPickUpLocation: "Soft Stack Factory",
                requestedDropOffLocation: "Lucha Libre",
                image: "https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D"
            };

            /*2. This needs to pull the ride and delete it from back end*/
            $scope.cancel = function() {
                $state.go("riderMatchedRide")
            };
            // this.onTabSelected = function(_scope) {

            //     if we are selecting the rider title then 
            //     change the state back to the top state
            //     if (_scope.title === 'Rider Page') {
            //         setTimeout(function() {
            //             $state.go('tab.rider', {});
            //         }, 20);
            //   }
            // };
        }
    ]);