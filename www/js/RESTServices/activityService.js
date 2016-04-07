angular.module("RESTServices", [])

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
                    startAddress: {city: "San Diego"},
                    destAddress: {city: "Coronado"}
                }, {
                    startDate: "April 17",
                    startAddress: {city: "San Diego"},
                    destAddress: {city: "Coronado"}
                }, {
                    startDate: "May 3",
                    startAddress: {city: "San Diego"},
                    destAddress: {city: "Coronado"}
                }, {
                    startDate: "July 8",
                    startAddress: {city: "San Diego"},
                    destAddress: {city: "Coronado"}
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
]);