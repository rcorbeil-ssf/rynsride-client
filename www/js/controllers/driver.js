angular.module('starter.controllers')
  .controller('DriverCtrl', ['$scope', '$state', '$ionicHistory', "SSFTranslateService", 'translation',
    function($scope, $state, $ionicHistory, SSFTranslateService, translation) {
     
       
      $scope.filterOptions = {
        sort: [{
          name:translation[0],
          state: "All"
        },{
          name: translation[1],
          state: "New"
        }, {
          name: translation[2],
          state: "Pending"
        }, {
          name: translation[3],
          state: "Reserved"
        }
        ]
      };
      $scope.consoleLog = function(a){
        console.log(a);
      };


      $scope.trips = [{
        startDate: "May 3",
        state: "Pending"

      }, {
        startDate: "June 4",
        state: "New",

      }, {
        startDate: "July 8",
        state: "Reserved",

      }, {
        startDate: "August 21",
        state: "Reserved",

      }, {
        startDate: "September 13",
        state: "Reserved",

      }, {
        startDate: "October 12",
        state: "Reserved",

      }];


      $scope.filterItem = {
        store: $scope.filterOptions.sort[0]
      };

      $scope.customFilter = function(trips) {
        if (trips.state === $scope.filterItem.store) {
          return true;
        }
        else if ($scope.filterItem.store === "All") {
          return true;
        }
        else {
          return false;
        }
      };
      //takes you to trip details
      $scope.goTo = function(trip) {
        if (trip == "Reserved") {
          $state.go("driverReservedRide");
        }
        //Takes you to Writer pending ride
        else if (trip == "Pending") {
          $state.go("");
        }
        //Trip details no riders
        else if (trip == "New") {
          $state.go("");
        }
      };


    }
  ]);
