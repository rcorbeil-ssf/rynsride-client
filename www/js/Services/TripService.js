angular.module ('starter.services', [])

// angular.module ('starter.services')

.service('TripServices', ['$window', 
function($window){
    var service = this,
    tripData = {
        driverID: "122",
        startAddress: "1748 San Diego Ave, San Diego, CA 92110", //(JSON object)
        startGeopoint: "32.743414, -117.182739", // (lon,lat)
        destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)
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

;