angular.module("RESTServices")

.service('MatchesService', ['SSFConfigConstants', '$http', '$q', 'PostedTripsService',
    function(SSFConfigConstants, $http, $q, PostedTripsService) {
        var path = 'Matches/';
        var service = this;

        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }
        
        service.matchedTrip = function(riderId, token) {
            
        };
        
    service.getTrip = function(token, rideId) {
        return $http({
            url: getUrl() + "riderMatchedTrip/", 
            method: "POST",
            headers: {
                'Authorization': token
            },
            data: {rideId: rideId}
        });
    };
    
        
      
        
        service.updateTrip = function(token, tripId, newData) {
            var defer = $q.defer();
            defer.resolve({
                status: 200
            });
            return defer.promise;
        };
        
        service.tripPendDrCommit = function (token, rideId){
            // tripId = '1';
            return $http({
                method: "POST",
                url: getUrl() + "riderPendingRide/",
                params:{
                    Authorization: token
                },
                data: {
                    tripId: rideId
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
	      service.changeState = function(token, userId, state  ) {
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