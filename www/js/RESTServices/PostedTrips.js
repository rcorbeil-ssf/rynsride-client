angular.module("RESTServices")

.service('PostedTripsService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'PostedTrips/',
            service = this;

        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }        
    service.postTripData = function(data, token) {
        return $http({
            url: getUrl(),
            method: "POST",
            data: data,
            headers: {
                'Authorization': token
            }
        });
    };

    service.getTripData = function() {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: [{
                    driverID: "250",
                    startAddress: "1748 Belmont Ave, San Diego, CA 92110", //(JSON object)
                    startGeopoint: "32.743414,-117.182739", // (lon,lat)
                    destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)
                    destGeopoint: "47.609561,-122.341505",
                    startDate: "4/29/2016",
                    startTime: "06:00pm",
                    expectedEndTime: "06:93pm",
                    seatsAvailable: "1",
                    roundTrip: "true",
                    dogOK: "false",
                    estimatedSharedExpense: "5000",
                    id: "1251", //need id for future reference of trip
                    rideActive: false, //Need to add a "ride active" property as a way to show/hide buttons on html.
                    state: "New" //By setting state to "complete", the ride will be complete, and the accompanying function will pass the completed trip into the driver history
                }, {
                    driverID: "122",
                    startAddress: "1748 San Diego Ave, San Diego, CA 92110", //(JSON object)
                    startGeopoint: "32.743414,-117.182739", // (lon,lat)
                    destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)
                    destGeopoint: "47.609561,-122.341505",
                    startDate: "4/29/2016",
                    startTime: "07:57pm",
                    expectedEndTime: "06:00am",
                    seatsAvailable: "2",
                    roundTrip: "true",
                    dogOK: "true",
                    estimatedSharedExpense: "20",
                    id: "1252", //need id for future reference of trip
                    rideActive: false, //Need to add a "ride active" property as a way to show/hide buttons on html.
                    state: "Pending" //By setting state to "complete", the ride will be complete, and the accompanying function will pass the completed trip into the driver history
                }, {
                    driverID: "125",
                    startAddress: "1748 Coronado Ave, San Diego, CA 92110", //(JSON object)
                    startGeopoint: "32.743414,-117.182739", // (lon,lat)
                    destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)
                    destGeopoint: "47.609561,-122.341505",
                    startDate: "4/29/2016",
                    startTime: "06:00pm",
                    expectedEndTime: "06:00",
                    seatsAvailable: "3",
                    roundTrip: "true",
                    dogOK: "false",
                    estimatedSharedExpense: "-5",
                    id: "1253", //need id for future reference of trip
                    rideActive: false, //Need to add a "ride active" property as a way to show/hide buttons on html.
                    state: "Reserved" //By setting state to "complete", the ride will be complete, and the accompanying function will pass the completed trip into the driver history
                }]
            });
            return defer.promise;
        };

    service.getRidersByTripId = function(tripID, token, date,userId) {
        date = "2016-03-20T00:00:00.000Z";
        userId = "1";
        
        //TODO: Add a remoteMethod in the backend for this
        return $http({
            url: getUrl() +
                '?filter[where][startDate][gt]=' + date +
                '&filter[where][driverId]=' + userId, 
            method: "GET",
            headers: {
                'Authorization': token
            }
        });
        
        // var defer = $q.defer();
        // defer.resolve({
        //     status: 200,
        //     data: [{
        //         name: "James Boogaloo",
        //         riderID: "1",
        //         age: "51",
        //         gender: "male",
        //         startAddress: "1337 Leet Dr., San Diego, CA 92110",
        //         startGeopoint: "32.753414,-118.182739", // (lon,lat) 
        //         destAddress: "705 Pike St, Seattle, WA 98101",
        //         destGeopoint: "47.612049,-122.332292",
        //         startDate: "04/22/2016",
        //         startAfterTime: "05:00pm",
        //         startBeforeTime: "08:00pm",
        //         seatsRequired: "1",
        //         roundTrip: false,
        //         haveDog: false,
        //         haveWheelchair: false,
        //         cellNumber: "909-210-5356",
        //         needReview: true, //need a review boolean to determine whether the driver still needs to be reviewed. Review page will return a false after a review has been submitted.
        //         tripId: "1251", //need tripId for future reference of trip
        //         state: "New" //This is similar to rideCompleted, giving the property of a completed trip, accompanying function will then be able to be stored into rider history page.
        //     }, {
        //         name: "Leif Meister",
        //         riderID: "2",
        //         age: "26",
        //         gender: "male",
        //         startAddress: "3232 Fake Ln, La Mesa, CA 92110",
        //         startGeopoint: "32.771139,-117.030657", // (lon,lat) 
        //         destAddress: "1001 Western Ave, Seattle, WA 98104",
        //         destGeopoint: "47.604322,-122.337528",
        //         startDate: "04/22/2016",
        //         startAfterTime: "06:00pm",
        //         startBeforeTime: "07:30pm",
        //         seatsRequired: "1",
        //         roundTrip: false,
        //         haveDog: false,
        //         haveWheelchair: false,
        //         tripId: "1251",
        //         needReview: true,
        //         state: "Reserved"
        //     }, {
        //         name: "Oscar Ripper",
        //         riderID: "3",
        //         age: "21",
        //         gender: "male",
        //         startAddress: "3537 Wightman St, San Diego, CA 92104",
        //         startGeopoint: "32.747845, -117.117068", // (lon,lat) 
        //         destAddress: "1436 SE Taylor St, Portland, OR 97214",
        //         destGeopoint: "45.514932, -122.650998",
        //         startDate: "04/22/2016",
        //         startAfterTime: "06:00pm",
        //         startBeforeTime: "07:30pm",
        //         seatsRequired: "1",
        //         roundTrip: false,
        //         haveDog: false,
        //         haveWheelchair: false,
        //         cellNumber: "6193844231",
        //         email: "oscar@123.com",
        //         tripId: "1251",
        //         needReview: true,
        //         state: "Pending"
        //     }]
        // });
        // return defer.promise;
    };

    service.getDriversByStartDate = function(token, date) {
        //add location later
        date = "2016-03-20T00:00:00.000Z";
        //TODO: locations and paging
        ///locations?filter[where][geo][near]=153.536,-28.1&filter[limit]=3
        //'&filter[where][geo][near]=153.536,-28.1&filter[limit]=1',
        return $http({
            url: getUrl() +
                '?filter[where][startDate][gt]=' + date +
                '&filter[where][or][0][state]=new' +
                '&filter[where][or][1][state]=pendDrvCmt',
            method: "GET",
            headers: {
                'Authorization': token
            }
        });
    };
        
        
    //update a specific instace by id and change the state to started/canceled/completed.
    //Also needs to notify riders based on which state it is
    service.updateTrip = function (token, tripId, newData) {
        var defer = $q.defer();
        defer.resolve(
            {status: 200}
        );
  		return defer.promise;
    };
    
    service.getMatchedTrips = function(rideId, state, token) {
        //TODO: Add a remoteMethod in the backend for this
        var defer = $q.defer();
        defer.resolve({
            status: 200,
            data: [{
            }]
        });
  		return defer.promise;
	};
	
    service.getDriverHistory = function(driverId, state, token) {
        //TODO: Add a remoteMethod in the backend for this
        var defer = $q.defer();
        defer.resolve({
            status: 200,
            data: [{
                    driverId: "122", 			//reference to User
           	        startAddress: "1748 San Diego Ave, San Diego, CA 92110",   //(JSON object)	see User
           	        startGeopoint: "32.743414, -117.182739",  //(lon,lat)		geoPoint
           	        destAddress: "1530 Pike Place, Seattle, WA 98101",     //(JSON object)	see User
           	        destGeopoint: "47.609561, -122.341505",	//		geoPoint
           	        startDate: "4/22/2016",		//	date
                    startTime: "06:00pm",		//	number
           	        estEndTime:	"06:00am",	//	number
           	        seatsAvailable: "2",	//		number
           	        pickupRadius: "5",	//	number // (miles)
           	        isRoundTrip: true,		//	boolean
           	        vehicleId:	"123",		 // reference to Vehicle
           	        estSharedExpense: "20",	//	number  (@.54/mile)
			        sameGender:	false,	   // boolean
                    ageRange:	"",	      // string
                    likesDogs:	false,	 // boolean
			        beenRated:	true,	// boolean
                    state: "completed", // string
                    tripId: "1251"

                }, {
                    driverId: "122", 			//reference to User
               	    startAddress: "3232 Fake Ln, La Mesa, CA 92110",   //(JSON object)	see User
               	    startGeopoint: "32.771139,-117.030657",  //(lon,lat)		geoPoint
               	    destAddress: "1001 Western Ave, Seattle, WA 98104",     //(JSON object)	see User
               	    destGeopoint: "47.604322,-122.337528",	//		geoPoint
               	    startDate: "6/10/2016",		//	date
                    startTime: "03:00pm",		//	number
               	    estEndTime:	"08:00am",	//	number
               	    seatsAvailable: "2",	//		number
               	    pickupRadius: "5",	//	number // (miles)
               	    isRoundTrip: true,		//	boolean
               	    vehicleId:	"123",		 // reference to Vehicle
               	    estSharedExpense: "20",	//	number  (@.54/mile)
    			    sameGender:	false,	   // boolean
                    ageRange:	"",	      // string
                    likesDogs:	false,	 // boolean
    			    beenRated:	true,	// boolean
                    state: "completed", // string
                    tripId: "1251"
                }, {
                    driverId: "122", 			//reference to User
           	        startAddress: "1234 San Diego Ave, San Diego, CA 92110",   //(JSON object)	see User
           	        startGeopoint: "32.743414, -117.182739",  //(lon,lat)		geoPoint
           	        destAddress: "5678 Butterfly Ln, San Diego, CA 12345",     //(JSON object)	see User
           	        destGeopoint: "47.609561, -122.341505",	//		geoPoint
           	        startDate: "4/22/2016",		//	date
                    startTime: "06:00pm",		//	number
           	        estEndTime:	"06:00am",	//	number
           	        seatsAvailable: "2",	//		number
           	        pickupRadius: "5",	//	number // (miles)
           	        isRoundTrip: true,		//	boolean
           	        vehicleId:	"123",		 // reference to Vehicle
           	        estSharedExpense: "20",	//	number  (@.54/mile)
			        sameGender:	false,	   // boolean
                    ageRange:	"",	      // string
                    likesDogs:	false,	 // boolean
			        beenRated:	true,	// boolean
                    state: "completed", // string
                    tripId: "1251"
                }
            ]
        });
  		return defer.promise;
	};
    
    service.getRiderHistory = function(riderId, state, token) {
        //TODO: Add a remoteMethod in the backend for this
        var defer = $q.defer();
        defer.resolve({
            status: 200,
            data: [{
                    riderId: "1",			
                    startAddress: "1337 Leet Dr., San Diego, CA 92110", //		(JSON object)
                    startGeopoint: "32.753414, -118.182739", // (lon,lat)
                    destAddress: "705 Pike St, Seattle, WA 98101",		//(JSON object)
                    destGeopoint: "47.612049, -122.332292",
                    startDate: "04/22/2016",
                    startTime: "05:00pm",
                    seatsRequired: "1",
                    needRoundTrip: false,
                    sameGender:	false,	//boolean
                    ageRange: "",		//string
                    likesDogs:	true,	//boolean
			        bike: false,
			        wheelchair: false,
			        beenRated:	true,	//boolean
                    state:  "completed"        //new, matched, pendingDriver, reserved, canceled,


                }, {
                    riderId: "1",			
                    startAddress: "1412 Fake St., San Diego, CA 92110", //		(JSON object)
                    startGeopoint: "32.763414, -118.122739", // (lon,lat)
                    destAddress: "705 Bart Rd, Los Angeles, CA 98101",		//(JSON object)
                    destGeopoint: "47.612049, -122.332292",
                    startDate: "02/01/2016",
                    startTime: "05:00pm",
                    seatsRequired: "1",
                    needRoundTrip: false,
                    sameGender:	false,	//boolean
                    ageRange: "",		//string
                    likesDogs:	true,	//boolean
			        bike: false,
			        wheelchair: false,
			        beenRated:	true,	//boolean
                    state:  "completed"        //new, matched, pendingDriver, reserved, canceled,   
                }, {
                    riderId: "1",			
                    startAddress: "34111 Bort Dr., San Diego, CA 92110", //		(JSON object)
                    startGeopoint: "32.753414, -118.182739", // (lon,lat)
                    destAddress: "705 Tree Rd, Seattle, WA 98101",		//(JSON object)
                    destGeopoint: "47.612049, -122.332292",
                    startDate: "09/12/2011",
                    startTime: "05:00pm",
                    seatsRequired: "1",
                    needRoundTrip: false,
                    sameGender:	false,	//boolean
                    ageRange: "",		//string
                    likesDogs:	true,	//boolean
			        bike: false,
			        wheelchair: false,
			        beenRated:	true,	//boolean
                    state:  "completed"        //new, matched, pendingDriver, reserved, canceled,
                }
            ]
        });
  		return defer.promise;
	};
	
	
	// TODO: Need a getTripByTripId.
	//      -Needs to talk to postedtrips model, filtered by tripId.
	//      -Returns trip object.
	service.getTripByTripId = function(tripId, token){
	    var defer = $q.defer();
	    defer.resolve({
	        status: 200,
	        data: [{
                    driverId: "122", 			//reference to User
           	        startAddress: "1748 San Diego Ave, San Diego, CA 92110",   //(JSON object)	see User
           	        startGeopoint: "32.743414, -117.182739",  //(lon,lat)		geoPoint
           	        destAddress: "1530 Pike Place, Seattle, WA 98101",     //(JSON object)	see User
           	        destGeopoint: "47.609561, -122.341505",	//		geoPoint
           	        startDate: "4/22/2016",		//	date
                    startTime: "06:00pm",		//	number
           	        estEndTime:	"06:00am",	//	number
           	        seatsAvailable: "2",	//		number
           	        pickupRadius: "5",	//	number // (miles)
           	        isRoundTrip: true,		//	boolean
           	        vehicleId:	"123",		 // reference to Vehicle
           	        estSharedExpense: "20",	//	number  (@.54/mile)
			        sameGender:	false,	   // boolean
                    ageRange:	"",	      // string
                    likesDogs:	false,	 // boolean
			        beenRated:	true,	// boolean
                    state: "completed", // string
                    tripId: "3"

                }, {
                    driverId: "122", 			//reference to User
               	    startAddress: "3232 Fake Ln, La Mesa, CA 92110",   //(JSON object)	see User
               	    startGeopoint: "32.771139,-117.030657",  //(lon,lat)		geoPoint
               	    destAddress: "1001 Western Ave, Seattle, WA 98104",     //(JSON object)	see User
               	    destGeopoint: "47.604322,-122.337528",	//		geoPoint
               	    startDate: "6/10/2016",		//	date
                    startTime: "03:00pm",		//	number
               	    estEndTime:	"08:00am",	//	number
               	    seatsAvailable: "2",	//		number
               	    pickupRadius: "5",	//	number // (miles)
               	    isRoundTrip: true,		//	boolean
               	    vehicleId:	"123",		 // reference to Vehicle
               	    estSharedExpense: "20",	//	number  (@.54/mile)
    			    sameGender:	false,	   // boolean
                    ageRange:	"",	      // string
                    likesDogs:	false,	 // boolean
    			    beenRated:	true,	// boolean
                    state: "completed", // string
                    tripId: "2"
                }, {
                    driverId: "122", 			//reference to User
           	        startAddress: "1234 San Diego Ave, San Diego, CA 92110",   //(JSON object)	see User
           	        startGeopoint: "32.743414, -117.182739",  //(lon,lat)		geoPoint
           	        destAddress: "5678 Butterfly Ln, San Diego, CA 12345",     //(JSON object)	see User
           	        destGeopoint: "47.609561, -122.341505",	//		geoPoint
           	        startDate: "4/22/2016",		//	date
                    startTime: "06:00pm",		//	number
           	        estEndTime:	"06:00am",	//	number
           	        seatsAvailable: "2",	//		number
           	        pickupRadius: "5",	//	number // (miles)
           	        isRoundTrip: true,		//	boolean
           	        vehicleId:	"123",		 // reference to Vehicle
           	        estSharedExpense: "20",	//	number  (@.54/mile)
			        sameGender:	false,	   // boolean
                    ageRange:	"",	      // string
                    likesDogs:	false,	 // boolean
			        beenRated:	true,	// boolean
                    state: "completed", // string
                    tripId: "1"
                }
            ]
	    });
	};
}]) ;