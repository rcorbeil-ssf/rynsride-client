angular.module('starter.controllers')
    .controller('RiderNewRideCtrl', ['$scope', '$state', '$ionicHistory', "UpdateUser",
        function($scope, $state, $ionicHistory, UpdateUser) {
            $scope.tripDetails = {
                driverID: "250",
                startAddress: "1748 Belmont Ave, San Diego, CA 92110", //(JSON object)
                startGeopoint: "32.743414,-117.182739", // (lon,lat)
                destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)
                destGeopoint: "47.609561,-122.341505",
                startDate: "4/29/2016",
                startTime: "06:00pm",
                expectedEndTime: "7:53pm",
                seatsAvailable: "1",
                roundTrip: "true",
                dogOK: "false",
                estimatedSharedExpense: "5000",
                id: "1251", //need id for future reference of trip
                rideActive: false, //Need to add a "ride active" property as a way to show/hide buttons on html.
                state: "New" //By setting state to "complete", the ride will be complete, and the accompanying function will pass the completed trip into the driver history
            };
            $scope.cancel = function() {
                UpdateUser.riderPendingTripCanceled({
                        state: "canceled"
                    })
                    .then(function(res) {
                        if (res.status === 200) {
                            $state.go("rider");
                        }
                        else {
                            //Handle what happens if there's an error
                        }
                    });
            };
        }
    ]);