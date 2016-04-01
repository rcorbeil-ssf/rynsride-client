angular.module('starter.services')

.service('RiderTripDetailsService', ['$window',
    function($window) {
        var service = this,
            driverData;

        service.currentTrip = function(setTrip) {
            if (setTrip !== undefined)
                driverData = setTrip;
            return driverData;
        };
    }
]);