// angular.module("RESTServices")

// .service('LobbyService', ['SSFConfigConstants', '$http', '$q', '$window', function(SSFConfigConstants, $http, $q, $window) {
//     var path = 'PostedTrips/',
//         service = this;

//     function getUrl() {
//         return SSFConfigConstants.EndpointUrl.url + path;
//     }

//     service.getGeopoint = function($scope, ActivityService) {
//         navigator.geolocation.getCurrentPosition(function(position) {
//             console.log(position.coords.latitude, position.coords.longitude);
//             var geopoint = {
//                 lng: position.coords.longitude,
//                 lat: position.coords.latitude
//             };
//             ActivityService.locationAllowed(geopoint)
//                 .then(function(response) {
//                         if (response.status === 200) {
//                             return response.then(function(res) {
//                                 return res;
//                             });
//                         }
//                         else {
//                             // invalid response
//                             // $scope.retryActivity();
//                             console.log('Status not 200');
//                         }
//                     },
//                     function(response) {
//                         // something went wrong
//                         // $scope.retryActivity();
//                     });
//         });
//     };


// }]);



//  getDriverInfo: ["MatchesService", "$window", "TripServices", "VehicleService", "RiderTripDetailsService", function(MatchesService, $window, TripServices, VehicleService, RiderTripDetailsService) {
//                         var driverInfo = TripServices.currentTrip();
//                         var info = {};
//                         var info2 = {};
//                         return MatchesService.tripPendDrCommit($window.localStorage.token, driverInfo.rideId).then(function(response) {
//                             info = response.data[0];
//                             return VehicleService.byId($window.localStorage.token, info.id);
//                         }).then(function(res) {
//                             info2 = {
//                                 info: info,
//                                 check: res
//                             };
//                             RiderTripDetailsService.currentRide(info2.info);
//                             return info2;
//                         });
//                     }]
                    
//                     //
                    
//                      getRides: ['RideRequestsService', function(RideRequestsService) {
//                         return RideRequestsService.getRideData()
//                             .then(function(response) {
//                                 if (response.status === 200) {
//                                     return response.data;
//                                 }
//                                 else {
//                                     // SSFTranslateService.showAlert('', '')
//                                     // $state.go('');
//                                 }
//                                 return [];
//                             }, function(error) {
//                                 console.log(error);
//                                 alert("error");
//                             });
//                     }],




//  $scope.locationAllowed = function() {
//             navigator.geolocation.getCurrentPosition(function(position) {
//                 console.log(position.coords.latitude, position.coords.longitude);
//                 var geopoint = {
//                     lng: position.coords.longitude,
//                     lat: position.coords.latitude
//                 };
//                 ActivityService.locationAllowed(geopoint)
//                     .then(function(response) {
//                             if (response.status === 200) {
//                                 $scope.rides = response.data;
//                                 console.log('Allowed');
//                                 $window.localStorage.locationAllowed = true;
//                             }
//                             else {
//                                 // invalid response
//                                 // $scope.retryActivity();
//                                 console.log('Status not 200');
//                             }
//                         },
//                         function(response) {
//                             // something went wrong
//                             // $scope.retryActivity();
//                         });
//             }, function(error) {
//                 if (error.code === error.PERMISSION_DENIED) {
//                     $window.localStorage.locationAllowed = false;
//                     SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.SOME_RETRY_ERROR");
//                     $scope.rides = locationBlocked;

//                     console.log("Blocked");
//                 }
//             });
//             console.log('Always called');
//         };