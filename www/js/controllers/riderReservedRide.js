angular.module('starter.controllers')
    .controller('RiderReservedRideCtrl', ['$scope', '$state', '$ionicHistory',
        function($scope, $state, $ionicHistory) {

            $scope.fakeRide = {
                startDate: "May 3",
                profilePicture: "Pending",
                name: "Ryan M",
                age: "27",
                gender:"Male",
                pickUpTime:"7:30 PM",
                pickUpLocation:"Soft Stack Factory",
                dropOffLocation:"Lucha Libre",
                image:"https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D",
                make: "Toyota",
                model: " Rav4",
                color: "blue",
                licence:"a5sd1fa",
                map:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTD5kEvneyLCjfCoSZXEL-Z4LP2JMbuMex-j8ZrpjSx_k1r8AQO"
            };
            //cancel ride
            $scope.cancel = function(){
                
            };
            //auto 0 rating
             $scope.driverNoShow = function(){
                
            };
           
        }
    ]);