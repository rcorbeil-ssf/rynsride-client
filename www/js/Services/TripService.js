angular.module('starter.services', [])
    // angular.module ('starter.services')
.service('TripServices', ['$window',
    function($window) {
        var service = this,
            tripData
            = {
                driverID: "122",
                startAddress: {
                    street: "1748 San Diego Ave", 
                    city: "San Diego", 
                    state: "CA", 
                    zip: "92110"
                }, //(JSON object)
                startGeopoint: "32.743414, -117.182739", // (lon,lat)
                destAddress: {
                    street: "1530 Pike Place", 
                    city: "Seattle", 
                    state: "WA", 
                    zip: "98101"
                }, // (JSON object)
                destGeopoint: "47.609561, -122.341505",
                startDate: "April 22nd",
                startTime: "06:00pm",
                expectedEndTime: "06:00am",
                seatsAvailable: "2",
                roundTrip: "true",
                dogOK: "false",
                estimatedSharedExpense: "20",
                id: "1251", //need tripId for future reference of trip
                rideActive: false, //Need to add a "ride active" property as a way to show/hide buttons on html.
                state: "reserved" //By setting state to "complete", the ride will be complete, and the accompanying function will pass the completed trip into the driver history
            };
        service.currentTrip = function(setTrip){
            if(setTrip !== undefined)
                tripData = setTrip;
            return tripData;
        };
}])
.service('HistoryService', ['$window',
    function($window) {
        var service = this;
        var object;
        var driver;
        var historyData = {
            };
        service.listedHistory = function(listHist) {
            if (listHist !== undefined)
                historyData = listHist;
            return historyData;
        };
        service.saveTrip = function(trip){
            object = trip;
        };
        service.getTrip = function() {
            if (object !== undefined){
                return object;
            }  else {
                console.log('Error: Unable to get trip detail data using Resolve');
            }
        };
        service.getDriverInfo = function(){
        };
    }
])
.service('UserService', ['$window',
    function ($window){
    var service = this;
    var userEdit;
    var vehicleEdit;
    var userData;
    var vehicleData;
    service.getUserInfo = function(){
        return userData;
    };
    service.getVehicleInfo = function(){
        return vehicleData;
    };
    service.currentUserInfo = function(setData) {
            if (setData !== undefined) {
                userData = setData;
            } else {
                return userData;
            }
        };
    service.currentVehicleInfo = function(setData) {
        if (setData !== undefined) {
            vehicleData = setData;
        } else {
            return vehicleData;
        }
    };
    service.updateProfile = function(userData, vehicleData){
      userEdit = userData;
      vehicleEdit = vehicleData;
    };
}])
.service('MatchedService', ['$window',
    function($window) {
        var service = this;
        var rideRequest = {
                id: "8",
                riderId: "5",		
                startAddress: "1234 Dream Road, San Diego, CA",	//	(JSON object)
                startGeopoint: "32.2341, -117.1252", //(lon,lat)
                destAddress: "1020 Pork Ave, Seattle, WA 98101",	//	(JSON object)
                destGeopoint: "47.609561, -122.341505",
                startDate: "4/22/2016",
                startTime: "07:00pm",
                seatsRequired: "1",
                needRoundTrip: true,
                sameGender: false,//boolean
                ageRange: "18-30",	//string
                likesDogs:	false, //boolean
		        bike: false,
		        wheelchair: false,
		        beenRated:	false,	//boolean
		        createDate: "3/25/2016",
                state: "matched" //new, matched, pendingDriver, reserved, canceled
        };
    
        service.getRiderId = function(){
            return rideRequest.id;
        };
//         service.getAllMatchedTrips = function(riderId, token){
//             // talks to Matches Model on backend vvvvvvv
//             //no return?
//             MatchesService.matchedTrip(riderId, token)
//             .then(function(response){
//                 if (response.status == 200){
//                     return response.data;
//                 } else {
//                     console.log('Error: was not able to get data from Matches Model');
//                 }
//             });
//         };
//         service.getTripDetails = function(riderId, token){
//             var arrayOfMatchedTrips = service.getAllMatchedTrips(riderId, token);
//             var arrayOfTripDetails = [];
//         };
}]);
