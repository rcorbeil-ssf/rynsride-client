angular.module('starter.controllers')
  .controller('DriverCtrl', ['$scope', '$state', '$ionicHistory',
    function($scope, $state, $ionicHistory){
      
      $scope.filterOptions = {
      sort:[
		{name : 'All', state: "All" },
		{name : 'New', state: "New" },
		{name : 'Pending', state: "Pending" },
		{name : 'Reserved', state: "Reserved" }
		
		
    ]};
  

$scope.trips= [
    {
      startDate: "May 3",
      state: "Pending"
      
    },
    {
      startDate: "June 4",
      state: "New",
      
    },
    {
      startDate: "July 8",
      state: "Reserved",
      
    },
    {
      startDate: "August 21",
      state: "Reserved",
      
    },
    {
      startDate: "September 13",
      state: "Reserved",
      
    },
    {
      startDate: "October 12",
      state: "Reserved",
      
    }
  ];
  
  
   $scope.filterItem = {
    store: $scope.filterOptions.sort[0]
  };
  
  $scope.customFilter = function (trips) {
    if (trips.state === $scope.filterItem.store.state) {
      return true;
    } else if($scope.filterItem.store.state === "All") {
      return true;
    } else {
      return false;
    }
  };
  
  $scope.goTo = function(trip){
    if( trip == "Reserved"){
      $state.go();
    }
    else if(trip == "Pending"){
      $state.go("riderPendingRide");
    }
    else if(trip == "New"){
      $state.go();
    }
  };
  

    }
]);
