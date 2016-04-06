angular.module("RESTServices")

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
]);

