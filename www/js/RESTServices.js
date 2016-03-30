angular.module("RESTServices", [])

.service('PostedTripsService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'PostedTrips/',
            service = this;

        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }

        //  Return trips that have not been completed
        //  Only related to a specific driver
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
                    state: "new" //By setting state to "complete", the ride will be complete, and the accompanying function will pass the completed trip into the driver history
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
                    state: "pending" //By setting state to "complete", the ride will be complete, and the accompanying function will pass the completed trip into the driver history
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
                    state: "reaserved" //By setting state to "complete", the ride will be complete, and the accompanying function will pass the completed trip into the driver history
                }]
            });
            return defer.promise;
        };

        // service.tempName = function() {
        //     var defer = $q.defer();
        //     defer.resolve(
        //             {}
        //         );
        //     return defer.promise;
        // };



        /*  1).  First we must create a new service that gets the trip data.
            2).  We inject SSFCon
    
        */
    }
])




.service('UsersService', ['SSFConfigConstants', '$http',
    function(SSFConfigConstants, $http) {
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
                url: getUrl() + userId,
                method: "PUT",
                data: changedInfo,
                headers: {
                    'Authorization': token
                }
            });
        };
        service.logout = function(token) {
            return $http({
                url: getUrl() + "logout",
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
    }
])



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
                    location: "San Diego"
                }, {
                    startDate: "April 17",
                    location: "San Diego"
                }, {
                    startDate: "May 3",
                    location: "San Diego"
                }, {
                    startDate: "July 8",
                    location: "San Diego"
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

    }
])
//GETTT YOUR DRIVER INFO SERVICEEEEEE
.service('GetDriverInfoService', ['$q', function($q) {
    var service = this;
    var infoOfDriver = {
        mockUserID: 1,
        name: 'Ryan',
        age: '27',
        gender: 'Male',
        image: "https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D"
    };

    service.getDriverInfo = function(data) {
        var defer = $q.defer();
        defer.resolve({
            status: 200,
            data: infoOfDriver
        });
        return defer.promise;
    };
}])
// GETTT YOUR RIDER INFO SERVICEEEEE
.service('GetRiderInfoService', ['$q', function($q) {
    var service = this;
    var infoOfRider = {
        mockUserID: 1,
        name: 'Ryan',
        age: '27',
        gender: 'Male',
        image: "https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D"
    };

    service.getRiderInfo = function(data) {
        var defer = $q.defer();
        defer.resolve({
            status: 200,
            data: infoOfRider
        });
        return defer.promise;
    };
}])
//SKEET SKEET YEEEEEEEE
//Mock service
/*
.service('RatingsService', function () {
        var service = this;
        var questions = [];
        service.setRatings = function(serverRatings)
        {
            ratings = serverRatings;
        };
        service.getRating = function(questionID)
        {
            var results = [];
            questions.forEach(function(question){
            //Search for ratings with the specified rating ID
                if(rating.Rating_Number == ratingID)
                    results.push(rating);
            }); 
            return results;
        };
        service.ratingsLength = function(){
            return ratings.length;
        };
    })
*/


.service('UpdateUser', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'RideRequests/',
            service = this;

        // function getUrl() {
        //     return SSFConfigConstants.EndpointUrl.url + path;
        // }

        //  Return trips that have not been completed
        //  Only related to a specific driver
       
	service.riderPendingTripCanceled  = function (token, data){
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
}]);
