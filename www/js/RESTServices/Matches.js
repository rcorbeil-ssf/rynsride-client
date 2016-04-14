angular.module("RESTServices")

.service('MatchesService', ['SSFConfigConstants', '$http', '$q', 'PostedTripsService',
    function(SSFConfigConstants, $http, $q, PostedTripsService) {
        var path = 'Matches/';
        var service = this;

        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }
        
        service.matchedTrip = function(riderId, token) {

            //TODO: Add a remoteMethod in the backend for this

            //     var defer = $q.defer();
            //     defer.resolve({
            //         status: 200,
            //         data: [{
            //             tripId: "1",
            //   riderId: "5",
            //   dateStamp: "11:34am 4/10/2016", //(which includes time)
            //   updateStamp: "",
            //   state: "matched"	//string: matched, pending, reserved, complete
            //         } , {
            //             tripId: "2",
            //   riderId: "5",
            //   dateStamp: "10:11am 4/7/2016", //(which includes time)
            //   updateStamp: "",
            //   state: "matched"	//string: matched, pending, reserved, complete
            //         } , {
            //             tripId: "3",
            //   riderId: "5",
            //   dateStamp: "12:15pm 4/3/2016", //(which includes time)
            //   updateStamp: "",
            //   state: "matched"	//string: matched, pending, reserved, complete
            //         } , {
            //             tripId: "4",
            //   riderId: "5",
            //   dateStamp: "8:00pm 4/13/2016", //(which includes time)
            //   updateStamp: "",
            //   state: "matched" 	//string: matched, pending, reserved, complete
            //         }]
            //     });
            // return defer.promise;
        };
        
        // service.getTripDetails = function(riderId, token) {
        //     var arrayOfMatchedTrips = MatchedService.getAllMatchedTrips(riderId, token);
        //     var arrayOfTripDetails = [];
        //     var defer = $q.defer();
        //     for (var i = 0; i < arrayOfMatchedTrips.length; i++) {
        //         return PostedTripsService.getTripByTripId(arrayOfMatchedTrips[i].tripId, token)
        //             .then(function(response) {
        //                 if (response.status == 200) {
        //                     arrayOfTripDetails.push(response.data);
        //                 }
        //                 else {
        //                     console.log('was not able to get trip by trip id');
        //                 }
        //             });
        //     }
        //     defer.resolve({
        //         status: 200,
        //         data: arrayOfTripDetails
        //     });
        //     return defer.promise;
        // };
        
        service.updateTrip = function(token, tripId, newData) {
            var defer = $q.defer();
            defer.resolve({
                status: 200
            });
            return defer.promise;
        };
        
        service.tripPendDrCommit = function (token, tripId){
            tripId = '1';
            return $http({
                method: "POST",
                url: getUrl() + "pending/" + "?filter[where][tripId]=" + tripId,
                params:{
                    Authorization: token
                },
                data: {
                    tripId: tripId
                }
            });
        };
         
        service.tripReservedRiders = function (token, tripId){
            return $http({
                method: "GET",
                url: getUrl()+ "?filter[where][tripId]=" + tripId +
                               "&filter[where][state]=reserved",
                params:{
                    Authorization: token
                }   
            });
        };
    	service.getRidersByTripId = function(id, token){
		    return $http.get(getUrl()+"driverReservedRide/"+"?filter[where][tripId]="+id,{
      		    params: { access_token: token }
   		    });
	    };
	    service.getTripsByRiderId = function(riderId, token){
		    return $http.get(getUrl()+"riderMatchedRide/"+"?filter[where][riderId]="+riderId,{
      		    params: { access_token: token }
   	        });
	    };
	      service.changeState = function(token, userId,  state  ) {
            state =  {state:state};
            return $http({
                url: getUrl() +  userId,
                method: "PUT",
                data: state,
                params: {
                    Authorization: token
                }
            });
        };
    }
]);