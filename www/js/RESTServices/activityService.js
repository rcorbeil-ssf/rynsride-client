angular.module("RESTServices", [])

.service('ActivityService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'PostedTrips/',
        service = this;
        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }
        service.getActivityInfo = function(geopoint) {
          
        return $http({
            url: getUrl() + "locationAllowed/",
            method: "GET", 
        });
    };
    
     service.getActivityInfoOne = function(token, geoPoint) {
                var defer = $q.defer();
                defer.resolve({
                    status: 200,
                    data: {
                        driverID: "122",
                        startAddress: {
                            street: "1748 San Diego Ave",
                            city: "San Diego",
                            state: "CA", 
                            zip: "92110"
                        }, //(JSON object)
                        startGeopoint: "32.743414,-117.182739", // (lon,lat)
                        destAddress: { 
                            street: "1530 Pike Place",
                            city: "Seattle",
                            state: "WA",
                            zip: "98101"
                        }, // (JSON object)
                        destGeopoint: "47.609561,-122.341505",
                        startDate: "4/29/2016",
                        startTime: "07:57pm",
                        expectedEndTime: "06:00am",
                        make: "Ford",
                        model: "Escape",
                        color: "Blue",
                        license: "6AJ39D",
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
]);