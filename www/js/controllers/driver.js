angular.module('starter.controllers')
  .controller('DriverCtrl', ['$scope', '$state', '$ionicHistory', "SSFTranslateService", 'translation', 'getTrips', 'RiderTripDetailsService',
    function($scope, $state, $ionicHistory, SSFTranslateService, translation, getTrips, RiderTripDetailsService) {
 
      $scope.trips = getTrips;
       /*1 .Will need to check state on back end to make sure they are the same
         make sure state is named state on the back end*/
      $scope.filterOptions = {
        sort: [{
          name: translation[0],
          state: translation[0]
        },{
          name: translation[1],
          state: translation[1]
        }, {
          name: translation[2],
          state: translation[2]
        }, {
          name: translation[3],
          state: translation[3]
        }
        ]
      };
      /*2. Page will need to pull from back end 
        all trips that were posted and the filter
        will need to be able to filter those trips
        by state*/
      /*3. Each trip will need to go to its page
        using the id of the trip to pull details
        about that individual trip depending on state
        clicking on a trip will take them either to
        reserved trip, pending trip, or new trip*/
      /*4. Will need a settings button that will link
        back to settings page*/
      /*5. This page comes up when clicked on from
        driver tab*/
      $scope.filterItem = {
        store: $scope.filterOptions.sort[0]
      };

      $scope.customFilter = function(trips) {
        if (trips.state === $scope.filterItem.store) {
          return true;
        }
        else if ($scope.filterItem.store === translation[0]) {
          return true;
        }
       
        else {
          return false;
        }
      };
      /*6. takes you to trip details
       Will need to pull id for that trip*/
      
      $scope.goTo = function(trip) {
        RiderTripDetailsService.getRiderData(trip);
        
        if (trip.state == "Reserved") {
          $state.go("driverReservedRide");
        }
      /*7. Takes you to driver pending ride
          Will need to pull id for that trip*/
        else if (trip.state == "Pending") {
          $state.go("driverPendingTrip");
        }
        /*8.Trip details no riders
         Will need to pull id for that trip*/
        else if (trip.state == "New") {
          $state.go("driverTripDetails");
        }
      };
       $scope.historyGo = function() {
          $state.go('historyDriver'); 
        };
    }
  ]);
