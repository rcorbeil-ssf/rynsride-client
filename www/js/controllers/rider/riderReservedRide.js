angular.module('starter.controllers')
    .controller('RiderReservedRideCtrl', ['$scope', '$state', '$ionicHistory', "UpdateUser", "getDriverData", "getTripInformation",
        function($scope, $state, $ionicHistory, UpdateUser, getDriverData, getTripInformation) {
            $scope.user = getDriverData;
            $scope.fakeRide = getTripInformation;
            // {
            //     startDate: "May 3",
            //     profilePicture: "Pending",
            //     name: "Ryan M",
            //     age: "27",
            //     gender:"Male",
            //     pickUpTime:"7:30 PM",
            //     pickUpLocation:"Soft Stack Factory",
            //     dropOffLocation:"Lucha Libre",
            //     image:"https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D",
            //     make: "Toyota",
            //     model: " Rav4",
            //     color: "blue",
            //     licence:"a5sd1fa",
            //     map:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTD5kEvneyLCjfCoSZXEL-Z4LP2JMbuMex-j8ZrpjSx_k1r8AQO"
            // };
            /*1. This needs to pull the ride and delete it from back end
              Also if ride deleted after half of the time when they posted it
              Will hurt their rating*/
            $scope.cancel = function() {
                UpdateUser.riderPendingTripCanceled({state: "canceled"})
                    .then(function(res) {
                            if (res.status === 200) {
                                $state.go("riderPage");
                            }
                            else{
                               //Need to handle an error 
                            }
                        });
                    };
            /*2. This needs to end the ride and send the
              Rider to the driver rate page*/
             $scope.driverNoShow = function(){
               UpdateUser.riderPendingTripCanceled({state: "canceled"})
                    .then(function(res) {
                            if (res.status === 200) {
                                $state.go("riderRating");
                            }
                            else{
                                //Need to handle an error
                            }
                        });
                    };
            /*3. When finished ride clicked on it will take them to the driver rating page*/
           
        }
    ]);