angular.module('starter.controllers')
    .controller('RiderMatchedRideCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', 'getMatchedTrips', 'RiderTripDetailsService',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate,  getMatchedTrips, RiderTripDetailsService) {
            // 1) Upon entering this page, the controller must make a request of the RideService for the
            // saved ride.
            // 2) It makes a request of the TripService to retrieve (from backend) all the matched trips for this ride.
            // 3) These are displayed in a list.
            // 4) If a list item is clicked, the trip is saved in the TripService and goes to the RiderTripDetails page.

            $scope.matchedDrivers = getMatchedTrips; // getMatchedTrips;
            $scope.riderTrip = {
                    //             id: "8",
                    //             riderId: "5",		
                    //         	startAddress: "1234 Dream Road, San Diego, CA",	//	(JSON object)
                    //         	startGeopoint: "32.2341, -117.1252", //(lon,lat)
                    //         	destAddress: "1020 Pork Ave, Seattle, WA 98101",	//	(JSON object)
                    //         	destGeopoint: "47.609561, -122.341505",
                    //         	startDate: "4/22/2016",
                    //         	startTime: "07:00pm",
                    //         	seatsRequired: "1",
                    //         	needRoundTrip: true,
                    //         	sameGender: false,//boolean
                    //         	ageRange: "18-30",	//string
                    //         	likesDogs:	false, //boolean
			                 //   bike: false,
			                 //   wheelchair: false,
			                 //   beenRated:	false,	//boolean
			                 //   createDate: "3/25/2016",
                    //         	state: "matched" //new, matched, pendingDriver, reserved, canceled
            };
            $scope.tripMatch = function(drivers) {
                //The drivers information is going to be sent to the trip details page via service
                // Page will then move to corresponding page, "riderTripDetails", and populate with information sent via service.
                RiderTripDetailsService.selectedTrip(drivers);
                $state.go("riderTripDetails-Rider", {}, {reload: true});
            };
        }
    ]);