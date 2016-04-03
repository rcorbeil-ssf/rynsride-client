angular.module("RESTServices", [])

.service('UsersService', ['SSFConfigConstants', '$http', '$q',
        function(SSFConfigConstants, $http, $q) {
    var path = 'SSFUsers/',
    service = this;
    // var url = SSFConfigConstants.EndpointUrl.url;
    function getUrl() {
        return SSFConfigConstants.EndpointUrl.url + path;
    }
    service.create = function(newUser) {
        return $http({
            url: getUrl(),
            method: "POST",
            data: newUser
        });
        // return $http.post(getUrl, newUser);
    };
    service.login = function(user) {
        user["ttl"] = 1209600000;
        return $http.post(getUrl() + "login", user);
    };
    service.updateUser = function(token, userId, changedInfo) {
        return $http({
            url: getUrl()+userId,
            method: "PUT",
            data: changedInfo,
            headers: {
                'Authorization': token
            }
        });
    };
    service.logout = function(token) {
        return $http({
            url: getUrl()+"logout",
            method: "POST",
            headers: {
                'Authorization': token
            }
        });
    };
    service.getIP = function() {
        return $http({
            url: 'https://api.ipify.org',
            method: "GET",
        });
    };
    service.getUserInfo = function(userId, token) {
        var defer = $q.defer();
         defer.resolve({
            status: 200,
            data: {
                "firstName": "Leif", // <---- changed property name from "name" to "firstName".
                "lastName": "", // <---- added property of "lastName" please remind to person making models.
                "address": "3000 University Ave, San Diego, CA 92104", 	//(JSON object) (encrypted)
                "email": "leif@leif.com",	//(encrypted)
                "cellPhone": "909-210-5356",	//(encrypted)
                "photo": "http://www.liveyachting.com/wp-content/uploads/2010/03/IMG_7130_SML.jpg",
                "gender": true,	//(encrypted)
                "age": 21,		//(encrypted)
                "facebookLoginAccount": "", 
                "language": "en",
                "userID": "123",
                "sameSexOnly": false,
                "ageRange": "18-30",
                "likesDogs": true,
                "needBikeRack": false,
                "needWheelchair": false,
                "avgRating": 4.5
            }
        });
  		return defer.promise;
    };
    service.getDriverInfo = function(riderId, token) {
        var defer = $q.defer();
         defer.resolve({
            status: 200,
            data: {
                "firstName": "Oscar", // <---- changed property name from "name" to "firstName".
                "lastName": "", // <---- added property of "lastName" please remind to person making models.
                "address": "3000 University Ave, San Diego, CA 92104", 	//(JSON object) (encrypted)
                "email": "leif@leif.com",	//(encrypted)
                "cellPhone": "909-210-5356",	//(encrypted)
                "photo": "http://www.liveyachting.com/wp-content/uploads/2010/03/IMG_7130_SML.jpg",
                "gender": true,	//(encrypted)
                "age": 21,		//(encrypted)
                "facebookLoginAccount": "", 
                "language": "en",
                "userID": "123",
                "sameSexOnly": false,
                "ageRange": "18-30",
                "likesDogs": true,
                "needBikeRack": false,
                "needWheelchair": false,
                "driverIdID": "123",
                "year": 2010,
                "make": "Jaguar",
                "model": "F-Type",
                "color": "Metallic Silver",
                "licensePlate": "7EDASDAS", //(encrypt)
                "bikeRack": "",
                "wheelchairAccessible": "",
                "vehiclePhoto": "http://cdn.pursuitist.com/wp-content/uploads/2013/11/jaguar2.jpg"
            }
        });
  		return defer.promise;
    };
}]) 

.service('ActivityService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        // var path = 'PostedTrips/',
        var service = this;
        // function getUrl() {
        //     return SSFConfigConstants.EndpointUrl.url + path;
        // }
        service.getActivityInfo = function(token, geoPoint) {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: [{
                    startDate: "June 4",
                    startLocation: "San Diego",
                    endLocation: "Coronado"
                }, {
                    startDate: "April 17",
                    startLocation: "San Diego",
                    endLocation: "Coronado"
                }, {
                    startDate: "May 3",
                    startLocation: "San Diego",
                    endLocation: "Coronado"
                }, {
                    startDate: "July 8",
                    startLocation: "San Diego",
                    endLocation: "Coronado"
                }]
            });
            return defer.promise;

            // this function should return an array of objects, each
            // the startDate and startLocation of a postedTrip/requestedRide
            // near the specified geoPoint


            // return $http({
            //     url: getUrl() + "getActivityInfo",
            //     method: "GET",
            //     data: geoPoint,
            //     headers: {
            //         'Authorization': token
            //     }
            // });
        };
    
     service.getActivityInfoOne = function(token, geoPoint) {
                var defer = $q.defer();
                defer.resolve({
                    status: 200,
                    data: { driverID: "122",
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
                        state: "pending" //By setting state to "complete", the ride will be complete, and the accompanying function will pass the completed trip into the driver history
                    }
                });
                return defer.promise;
            };
        }
])

.service('MatchesService', ['SSFConfigConstants', '$http', '$q', 'PostedTripsService', 'MatchedService',
        function(SSFConfigConstants, $http, $q, PostedTripsService, MatchedService) {
    var path = 'Matches/';
    var service = this;
        
    function getUrl(){
        return SSFConfigConstants.EndpointUrl.url + path;
    }    
        service.matchedTrip = function(riderId, token) {
        //TODO: Add a remoteMethod in the backend for this
        
        var defer = $q.defer();
        defer.resolve({
            status: 200,
            data: [{
                tripId: "1",
			    riderId: "5",
			    dateStamp: "11:34am 4/10/2016", //(which includes time)
			    updateStamp: "",
			    state: "matched"	//string: matched, pendDrCmt, reserved, complete
            } , {
                tripId: "2",
			    riderId: "5",
			    dateStamp: "10:11am 4/7/2016", //(which includes time)
			    updateStamp: "",
			    state: "matched"	//string: matched, pendDrCmt, reserved, complete
            } , {
                tripId: "3",
			    riderId: "5",
			    dateStamp: "12:15pm 4/3/2016", //(which includes time)
			    updateStamp: "",
			    state: "matched"	//string: matched, pendDrCmt, reserved, complete
            } , {
                tripId: "4",
			    riderId: "5",
			    dateStamp: "8:00pm 4/13/2016", //(which includes time)
			    updateStamp: "",
			    state: "matched" 	//string: matched, pendDrCmt, reserved, complete
            }]
        });
  		return defer.promise;
	};
	service.getTripDetails = function(riderId, token){
                var arrayOfMatchedTrips = MatchedService.getAllMatchedTrips(riderId, token);
                var arrayOfTripDetails = [];
                var defer = $q.defer();
                for (var i = 0; i < arrayOfMatchedTrips.length; i++){
                    return PostedTripsService.getTripByTripId(arrayOfMatchedTrips[i].tripId, token)
                        .then(function(response){
                            if (response.status == 200){
                                arrayOfTripDetails.push(response.data);
                            } else {
                                console.log('was not able to get trip by trip id');
                            }
                        });
                }
                defer.resolve({
                    status: 200,
                    data: arrayOfTripDetails
                });
      		    return defer.promise;
            };
        service.updateTrip = function(token, tripId, newData) {
            var defer = $q.defer();
            defer.resolve({
                status: 200
            });
            return defer.promise;
        };
    }
]) 

.service('DriverService', [
    function() {
        var service = this,
            tripData;
    
        service.currentTrip = function(setTrip) {
            if (setTrip !== undefined)
                tripData = setTrip;
            return tripData;
        };
    }
]) 

.service('VehicleService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'Vehicles/',
            service = this;
        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }

        service.byId = function() {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: {
                    bikeRack: true,
                    wheelchair: false
                }
            });
            return defer.promise;
        };
    }
])

.service('RequestedRidesService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'RequestedRides/',
            service = this;

        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }

        service.create = function(form) {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: {
                    id: "199"
                }
            });
            return defer.promise;
        };

        service.getRideData = function(tripID, token) {
            //TODO: Add a remoteMethod in the backend for this
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: [{
                    name: "James Boogaloo",
                    riderID: "1",
                    age: "51",
                    gender: "male",
                    startAddress: "1337 Leet Dr., San Diego, CA 92110",
                    startGeopoint: "32.753414,-118.182739", // (lon,lat) 
                    destAddress: "705 Pike St, Seattle, WA 98101",
                    destGeopoint: "47.612049,-122.332292",
                    startDate: "04/22/2016",
                    startAfterTime: "05:00pm",
                    startBeforeTime: "08:00pm",
                    seatsRequired: "1",
                    roundTrip: false,
                    haveDog: false,
                    haveWheelchair: false,
                    cellNumber: "909-210-5356",
                    needReview: true, //need a review boolean to determine whether the driver still needs to be reviewed. Review page will return a false after a review has been submitted.
                    tripId: "1251", //need tripId for future reference of trip
                    state: "New" //This is similar to rideCompleted, giving the property of a completed trip, accompanying function will then be able to be stored into rider history page.
                }, {
                    name: "Leif Meister",
                    riderID: "2",
                    age: "26",
                    gender: "male",
                    startAddress: "3232 Fake Ln, La Mesa, CA 92110",
                    startGeopoint: "32.771139,-117.030657", // (lon,lat) 
                    destAddress: "1001 Western Ave, Seattle, WA 98104",
                    destGeopoint: "47.604322,-122.337528",
                    startDate: "04/22/2016",
                    startAfterTime: "06:00pm",
                    startBeforeTime: "07:30pm",
                    seatsRequired: "1",
                    roundTrip: false,
                    haveDog: false,
                    haveWheelchair: false,
                    tripId: "1251",
                    needReview: true,
                    state: "Reserved"
                }, {
                    name: "Oscar Ripper",
                    riderID: "3",
                    age: "21",
                    gender: "male",
                    startAddress: "3537 Wightman St, San Diego, CA 92104",
                    startGeopoint: "32.747845, -117.117068", // (lon,lat) 
                    destAddress: "1436 SE Taylor St, Portland, OR 97214",
                    destGeopoint: "45.514932, -122.650998",
                    startDate: "04/22/2016",
                    startAfterTime: "06:00pm",
                    startBeforeTime: "07:30pm",
                    seatsRequired: "1",
                    roundTrip: false,
                    haveDog: false,
                    haveWheelchair: false,
                    cellNumber: "6193844231",
                    email: "oscar@123.com",
                    tripId: "1251",
                    needReview: true,
                    state: "Pending"
                }]
            });
            return defer.promise;
        };
    }
]) 

.service('PostedTripsService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'PostedTrips/',
            service = this;

        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }
        // to display a trip we need to get posted trips information passing in the driver id and excluding the completed, or
        // cancelled states.

        // to show Riders in the current trip, we will need to do get user information to display names, phone numbers, etc.
        // we will need to get their ride requests information, to display to the driver their location and destination.
        // we need to pass in their trip id with the current trip id in order to filter it correctly.

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

    service.getRidersByTripId = function(tripID, token) {
            //TODO: Add a remoteMethod in the backend for this
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: [{
                    name: "James Boogaloo",
                    riderID: "1",
                    age: "51",
                    gender: "male",
                    startAddress: "1337 Leet Dr., San Diego, CA 92110",
                    startGeopoint: "32.753414,-118.182739", // (lon,lat) 
                    destAddress: "705 Pike St, Seattle, WA 98101",
                    destGeopoint: "47.612049,-122.332292",
                    startDate: "04/22/2016",
                    startAfterTime: "05:00pm",
                    startBeforeTime: "08:00pm",
                    seatsRequired: "1",
                    roundTrip: false,
                    haveDog: false,
                    haveWheelchair: false,
                    cellNumber: "909-210-5356",
                    needReview: true, //need a review boolean to determine whether the driver still needs to be reviewed. Review page will return a false after a review has been submitted.
                    tripId: "1251", //need tripId for future reference of trip
                    state: "New" //This is similar to rideCompleted, giving the property of a completed trip, accompanying function will then be able to be stored into rider history page.
                }, {
                    name: "Leif Meister",
                    riderID: "2",
                    age: "26",
                    gender: "male",
                    startAddress: "3232 Fake Ln, La Mesa, CA 92110",
                    startGeopoint: "32.771139,-117.030657", // (lon,lat) 
                    destAddress: "1001 Western Ave, Seattle, WA 98104",
                    destGeopoint: "47.604322,-122.337528",
                    startDate: "04/22/2016",
                    startAfterTime: "06:00pm",
                    startBeforeTime: "07:30pm",
                    seatsRequired: "1",
                    roundTrip: false,
                    haveDog: false,
                    haveWheelchair: false,
                    tripId: "1251",
                    needReview: true,
                    state: "Reserved"
                }, {
                    name: "Oscar Ripper",
                    riderID: "3",
                    age: "21",
                    gender: "male",
                    startAddress: "3537 Wightman St, San Diego, CA 92104",
                    startGeopoint: "32.747845, -117.117068", // (lon,lat) 
                    destAddress: "1436 SE Taylor St, Portland, OR 97214",
                    destGeopoint: "45.514932, -122.650998",
                    startDate: "04/22/2016",
                    startAfterTime: "06:00pm",
                    startBeforeTime: "07:30pm",
                    seatsRequired: "1",
                    roundTrip: false,
                    haveDog: false,
                    haveWheelchair: false,
                    cellNumber: "6193844231",
                    email: "oscar@123.com",
                    tripId: "1251",
                    needReview: true,
                    state: "Pending"
                }]
            });
            return defer.promise;
        };

    service.getDriversByStartDate = function() {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: [{
                    id: 1,
                    driverID: "122",
                    vehicleId: "355",
                    firstName: 'Ryan',
                    age: 27,
                    gender: 'Male',
                    startDate: 'May 4',
                    startTime: '6:00 pm',
                    startAddress: 'San Diego',
                    destAddress: 'Corona',
                    photo: 'http://media.nj.com/giants_impact/photo/eli-manning-giantsjpg-15c6771a068c3ff5.jpg',
                    // preferences: {
                    sameGender: false,
                    ageRange: '18-34',
                    likesDogs: true,
                    state: 'New'
                        // }
                }, {
                    id: 2,
                    driverID: "158",
                    vehicleId: "209",
                    firstName: 'Tim',
                    age: 58,
                    gender: 'Male',
                    startDate: 'June 7',
                    startTime: '6:00 pm',
                    startAddress: 'San Diego',
                    destAddress: 'Corona',
                    photo: 'http://2.bp.blogspot.com/_XU9x8G7khv0/TKOIgBoUI7I/AAAAAAAAQxk/kkPW62mXBjg/s1600/timallen78mug1.jpg',
                    // preferences: {
                    sameGender: true,
                    ageRange: '35-70',
                    likesDogs: false,
                    state: 'Pending'
                        // }
                }, {
                    id: 3,
                    driverID: "12",
                    vehicleId: "120",
                    firstName: 'Tom',
                    age: 38,
                    gender: 'Male',
                    startDate: 'February 3',
                    startTime: '4:30 pm',
                    startAddress: 'Gilette Stadium',
                    destAddress: 'Fenway Park',
                    photo: 'https://pbs.twimg.com/media/B88OS1cIcAEWlhz.jpg',
                    // preferences: {
                    sameGender: false,
                    ageRange: '30-50',
                    likesDogs: true,
                    state: 'Reserved'
                        // }
                }]
            });
            return defer.promise;
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
}]) 

.service('UpdateUser', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'RideRequests/',
            service = this;
        // function getUrl() {
        //     return SSFConfigConstants.EndpointUrl.url + path;
        // }

        //  Return trips that have not been completed
        //  Only related to a specific driver
        service.riderPendingTripCanceled = function(token, data) {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
            });
            return defer.promise;

            // return $http({
            //     url:getUrl() + <id>,
            //     data: data,
            //     method: "PUT",
            //     params: {
            //         Authorization: token
            //     }
            // })
        };
    }
]) 

.service('GetDriverInfoService', ['$q', 
    function($q) {
        var service = this;
        var infoOfDriver = {
            mockUserID: 1,
            firstName: 'Ryan',
            lastName: 'Corbeil',
            age: '27',
            gender: 'Male',
            photo: "https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D"
        };
       service.getDriverInfo = function(data) {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: infoOfDriver
            });
            return defer.promise;
        };
    }
]) 

.service('GetRiderInfoService', ['$q', 
    function($q) {
        var service = this;
        var infoOfRider = {
            mockUserID: 1,
            firstName: 'Ryan',
            lastName: 'Corbeil',
            age: '27',
            gender: 'Male',
            photo: "https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D"
        };
        service.getRiderInfo = function(data) {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: infoOfRider
            });
            return defer.promise;
        };
    }
]);