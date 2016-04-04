angular.module("RESTServices")

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
]);