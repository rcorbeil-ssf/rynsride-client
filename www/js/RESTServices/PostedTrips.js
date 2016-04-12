angular.module("RESTServices")

.service('PostedTripsService', ['SSFConfigConstants', '$http', '$q', "$window",
    function(SSFConfigConstants, $http, $q, $window) {
        var path = 'PostedTrips/',
            service = this;

        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }     

    // USED FOR POST TRIP PAGE
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

    // USED FOR DRIVER PAGE
    service.getRidersByTripId = function(tripID, token, date, userId) {
        userId = "2";
        date = "2016-01-20T00:00:00.000";
        return $http({
            url: getUrl() +
                '?filter[where][driverId]=' + userId, 
            method: "GET",
            headers: {
                'Authorization': token
            }
        });
    };

    // USED FOR LOBBY PAGE
    service.getDriversByStartDate = function(date, token) {
        //add location later
        date = "2016-03-10T00:00:00.000";
        //TODO: locations and paging
        //'?filter[where][startDate][gt]=' + date + '&filter[limit]=5'
        return $http({
            url: getUrl() + "getNames" +
                '?filter[where][startDate][gt]=' + date,
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
	
    service.getDriverHistory = function(userId, startDate, token) {
        //TODO: Add a remoteMethod in the backend for this
       return $http({
			  url: getUrl()+
			  		"?filter[where][driverId]="+userId + 
			  		"&filter[where][startDate][lt]="+startDate,
			  method: 'GET',
      	  headers: { 'Authorization': token }
   		});
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
}]) 

;
