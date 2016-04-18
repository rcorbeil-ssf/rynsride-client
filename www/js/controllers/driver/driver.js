angular.module('starter.controllers')
  .controller('DriverCtrl', ['$scope', '$state', '$ionicHistory', "SSFTranslateService",
    'translation', 'getTrips', 'RiderTripDetailsService', "TripServices",
    function($scope, $state, $ionicHistory, SSFTranslateService, translation, getTrips,
    RiderTripDetailsService, TripServices) {
 
      $scope.trips = getTrips;
      
        $scope.filterOptions = {
            sort:[
        		{name: translation[0], state: 'all'},
        		{name: translation[1], state: 'new'},
        		{name: translation[2], state: 'pending'},
        		{name: translation[3], state: 'reserved'}
            ]
        };
    
        $scope.filterItem = {
            store: 'all'
        };

        $scope.customFilter = function(trips) {
            if($scope.filterItem.store === 'all') {
                return true;
            } else if(trips.state === $scope.filterItem.store) {
                return true;
            } else {
                return false;
            }
        };
        $scope.newTrip = function(trip) {
            RiderTripDetailsService.currentRide(trip);
            $state.go('driverTripDetails');
        };
        $scope.driverPendingTrip = function(trip) {
            RiderTripDetailsService.currentRide(trip);
            $state.go('driverPendingTrip');
        };
        $scope.driverReservedTrip = function(trip) {
            RiderTripDetailsService.currentRide(trip);
            $state.go('driverReservedRide');
        };

        $scope.goTo = function(trip) {
            if (trip.state == "new") {
                $scope.newTrip(trip);
            }
            else if (trip.state === "pending") {
                $scope.driverPendingTrip(trip);  
            }
            else if (trip.state === "reserved") {
                $scope.driverReservedRide(trip);
            }
        };
        
      // $scope.goTo = function(trip) {
      //   TripServices.currentTrip(trip);
      //   if (trip.state == "reserved") {
      //     $state.go("driverReservedRide");
      //   }
      //   else if (trip.state == "pending") {
      //     $state.go("driverPendingTrip");
      //   }
      //   else if (trip.state == "new") {
          
      //     $state.go("driverTripDetails");
      //   }
      // };
      $scope.historyGo = function() {
        $state.go('historyDriver');
      };
    }
  ]);
  
  /*1 .Will need to check state on back end to make sure they are the same
        make sure state is named state on the back end*/
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
  /*6. takes you to trip details
       Will need to pull id for that trip*/
