angular.module('starter.controllers')
    .controller('RiderPendingRideCtrl', ['$scope', '$state', '$ionicHistory',
        function($scope, $state, $ionicHistory) {

            $scope.pendingRiderCommit = {
                startDate: "May 3",
                profilePicture: "Pending",
                name: "Ryan M",
                age: "27",
                gender:"Male",
                requestedPickUpTime:"7:30 PM",
                requestedPickUpLocation:"Soft Stack Factory",
                requestedDropOffLocation:"Lucha Libre",
                image:"https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D"
            };
            $scope.cancel = function(){
                
            };
        }
    ]);