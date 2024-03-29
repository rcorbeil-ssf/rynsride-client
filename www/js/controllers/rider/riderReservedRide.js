angular.module('starter.controllers')
    .controller('RiderReservedRideCtrl', ['$scope', '$state', '$ionicHistory', "RideRequestsService", "$window", "RiderTripDetailsService", "TripServices", "getDriverInfo", "PostedTripsService", "MatchesService","$ionicPopover",
        function($scope, $state, $ionicHistory, RideRequestsService, $window, RiderTripDetailsService, TripServices, getDriverInfo, PostedTripsService, MatchesService, $ionicPopover) {


            //rider info
            $scope.tripDetails =  RiderTripDetailsService.currentRide();
            
            //trip info
            $scope.information = getDriverInfo;
            
            $scope.user = {};
            $scope.user.cellPhone = $scope.information.cellPhone;
            
            $ionicPopover.fromTemplateUrl('templates/popups/contactUser.html', {
                scope: $scope
              }).then(function(popover) {
                $scope.popover = popover;
              });
            $scope.openPopover = function($event) {
              $scope.popover.show($event);
            };
            $scope.closePopover = function() {
              $scope.popover.hide();
            };


            $scope.cancel = function() {
                // need to set state to cancelled
            };
            $scope.driverNoShow = function() {
                //need to set state to cancelled
            };
            /*3. When finished ride clicked on it will take them to the driver rating page*/

            $scope.finish = function() {
                RideRequestsService.changeState($window.localStorage.token, $scope.tripDetails.id, "ended")
                    .then(function(res) {
                      $state.go("riderRating");
                      return MatchesService.getMatchedId($window.localStorage.token, $scope.tripDetails.id, $scope.information.id);
                    //   $state.go("riderRating");
                    });
                    // .then(function(response) {
                    //     return  MatchesService.changeState($window.localStorage.token, response.id, "ended");
                    // })
                    //       .then(function(check) {
                    //           if (check.status === 200) {
                    //                 $state.go("riderRating");
                    //             }
                    //             else {
                    //                 //Handle what happens if there's an error
                    //             }
                    //         });
            };
            $scope.toggle1 = function() {
                $scope.toggleA ^= true;
            };
            $scope.toggle2 = function() {
                $scope.toggleB ^= true;
            };
        }
    ])

// .directive('toggle1', function() {
//     return {
//         restrict: 'C',
//         link: function(scope, element, attrs) {

//             scope.toggle1Click = function() {
//                 element.slideToggle('fast');
//             };
//         }
//     };
// })

// .directive('toggle2', function() {
//     return {
//         restrict: 'C',
//         link: function(scope, element, attrs) {

//             scope.toggle2Click = function() {
//                 element.slideToggle();
//             };

//         }
//     };
// });