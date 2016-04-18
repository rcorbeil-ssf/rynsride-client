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
        //     [{
        //             id: "1",
        //             driverId: "1",			//reference to User
        //             startAddress: "1748 San Diego Ave, San Diego, CA 92110", //(JSON object)	see User
        //             startGeopoint: "32.743414, -117.182739",        //   (lon,lat) geoPoint
        //             destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)	see User
        //             destGeopoint: "47.609561, -122.341505",		//	geoPoint
        //             startDate: "4/22/2016",		//	date
        //     	    startTime:	"06:00pm",	//	number
        //             estEndTime:	"06:00am",	//	number
        //             seatsAvailable:	"2",	//	number
        //             pickupRadius: "7",  //(miles)		number
        //             isRoundTrip: true, //			boolean
        //             vehicleId: "1",		//	reference to Vehicle
        //             estSharedExpense: "20", //	number  (@.54/mile)
			     //   sameGender:	false,	//boolean
        //             ageRange:	"18-30",	 //string
        //             likesDogs:	false, //	boolean
			     //   beenRated:	false,	//boolean
			     //   createDate: "4/10/2016",
        //             state: "matched"  //string
        //     } , {
        //             id: "2",
        //             driverId: "2",			//reference to User
        //             startAddress: "1290 San Diego Ave, San Diego, CA 92110", //(JSON object)	see User
        //             startGeopoint: "32.743414, -117.182739",        //   (lon,lat) geoPoint
        //             destAddress: "1876 Washington St, Seattle, WA 98101", // (JSON object)	see User
        //             destGeopoint: "47.609561, -122.341505",		//	geoPoint
        //             startDate: "4/22/2016",		//	date
        //     	    startTime:	"06:00pm",	//	number
        //             estEndTime:	"06:00am",	//	number
        //             seatsAvailable:	"2",	//	number
        //             pickupRadius: "7",  //(miles)		number
        //             isRoundTrip: true, //			boolean
        //             vehicleId: "2",		//	reference to Vehicle
        //             estSharedExpense: "20", //	number  (@.54/mile)
			     //   sameGender:	false,	//boolean
        //             ageRange:	"18-30",	 //string
        //             likesDogs:	false, //	boolean
			     //   beenRated:	false,	//boolean
			     //   createDate: "4/10/2016",
        //             state: "matched"  //string
        //     } , {
        //             id: "3",
        //             driverId: "3",			//reference to User
        //             startAddress: "1281 San Diego Ave, San Diego, CA 92110", //(JSON object)	see User
        //             startGeopoint: "32.743414, -117.182739",        //   (lon,lat) geoPoint
        //             destAddress: "1876 Washington St, Seattle, WA 98101", // (JSON object)	see User
        //             destGeopoint: "47.609561, -122.341505",		//	geoPoint
        //             startDate: "4/22/2016",		//	date
        //     	    startTime:	"06:00pm",	//	number
        //             estEndTime:	"06:00am",	//	number
        //             seatsAvailable:	"2",	//	number
        //             pickupRadius: "7",  //(miles)		number
        //             isRoundTrip: true, //			boolean
        //             vehicleId: "3",		//	reference to Vehicle
        //             estSharedExpense: "20", //	number  (@.54/mile)
			     //   sameGender:	false,	//boolean
        //             ageRange:	"18-30",	 //string
        //             likesDogs:	false, //	boolean
			     //   beenRated:	false,	//boolean
			     //   createDate: "4/10/2016",
        //             state: "matched"  //string
        //     } , {
        //             id: "4",
        //             driverId: "4",			//reference to User
        //             startAddress: "1211 San Diego Ave, San Diego, CA 92110", //(JSON object)	see User
        //             startGeopoint: "32.743414, -117.182739",        //   (lon,lat) geoPoint
        //             destAddress: "1020 Boolean Ave, Seattle, WA 98101", // (JSON object)	see User
        //             destGeopoint: "47.609561, -122.341505",		//	geoPoint
        //             startDate: "4/22/2016",		//	date
        //     	    startTime:	"06:00pm",	//	number
        //             estEndTime:	"06:00am",	//	number
        //             seatsAvailable:	"2",	//	number
        //             pickupRadius: "7",  //(miles)		number
        //             isRoundTrip: true, //			boolean
        //             vehicleId: "2",		//	reference to Vehicle
        //             estSharedExpense: "20", //	number  (@.54/mile)
			     //   sameGender:	false,	//boolean
        //             ageRange:	"18-30",	 //string
        //             likesDogs:	false, //	boolean
			     //   beenRated:	false,	//boolean
			     //   createDate: "4/18/2016",
        //             state: "matched"  //string
        //     }];

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
                $state.go("riderTripDetailsRider");
            };
        }
    ]);