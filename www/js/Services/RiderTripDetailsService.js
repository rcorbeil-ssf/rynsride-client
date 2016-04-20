angular.module('starter.services')

.service('RiderTripDetailsService', ['$window',
    function($window) {
        var service = this,
            driverData,
            rideRequestId,
            riderData,
            selectedTrip;

        // USED ON LOBBY AND RIDER PAGES TO GET TRIP DETAILS
        service.currentTrip = function(setTrip) {
            if (setTrip !== undefined)
                driverData = setTrip;
            return driverData;
        };
        
        // USED ON DRIVER AND RIDER PAGES TO GET RIDE REQUEST INFORMATION
        service.currentRide = function(setRide) {
            if (setRide !== undefined)
                rideRequestId = setRide;
            return rideRequestId;
        };
        
        // USED ON DRIVER PENDING TRIP PAGE TO GET RIDER'S INFORMATION
        service.getRiderData = function(trip) {
            if (trip !== undefined)
                riderData = trip;
            return riderData;
        };
        
        // USED ON RIDER MATCHED RIDE PAGE TO SELECT INDIVIDUAL TRIP DETAILS
        service.selectedTrip = function(trip){
            if (trip !== undefined){
                selectedTrip = trip;
            } else {
                return selectedTrip;
            }
        };
    }
]);