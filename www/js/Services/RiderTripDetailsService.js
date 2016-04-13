angular.module('starter.services')

.service('RiderTripDetailsService', ['$window',
    function($window) {
        var service = this,
            driverData,
            rideRequestiD,
            riderData,
            selectedTrip;

        service.currentTrip = function(setTrip) {
            if (setTrip !== undefined)
                driverData = setTrip;
            return driverData;
        };
        
        service.currentRide = function(setRide) {
            if (setRide !== undefined)
                rideRequestiD = setRide;
            return rideRequestiD;
        };
        
        service.getRiderData = function(trip) {
            if (trip !== undefined)
                riderData = trip;
            return riderData;
        };
        service.selectedTrip = function(trip){
            if (trip !== undefined){
                selectedTrip = trip;
            } else {
                return selectedTrip;
            }
        };
    }
]);