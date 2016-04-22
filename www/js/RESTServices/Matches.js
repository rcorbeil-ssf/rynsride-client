angular.module("RESTServices")

.service('MatchesService', ['SSFConfigConstants', '$http', '$q', 'PostedTripsService',
function(SSFConfigConstants, $http, $q, PostedTripsService) {
    var path = 'Matches/';
    var service = this;

    function getUrl() {
        return SSFConfigConstants.EndpointUrl.url + path;
    }
    
    service.changeState = function(token, matchedId, state) {
        state = {
            state: state
        };
        return $http({
            url: getUrl() + matchedId,
            method: "PUT",
            data: state,
            params: {
                Authorization: token
            }
        });
    };

   service.getTrip = function(token, rideId) {
        return $http({
            url: getUrl() + "riderMatchedTrip/",
            method: "POST",
            headers: {
                'Authorization': token
            },
            data: {
                rideId: rideId
            }
        });
    };

    service.updateTrip = function(token, tripId, newData) {
        var defer = $q.defer();
        defer.resolve({
            status: 200
        });
        return defer.promise;
    };
    
    service.riderReservedRide = function (token, rideId){
        return $http({
            method: "POST",
            url: getUrl() + "riderReservedTrip/",
            params: {
                Authorization: token
            },
            data: {
                tripId: rideId
            }
        });
    };

    service.tripPendDrCommit = function(token, rideId) {
        return $http({
            method: "POST",
            url: getUrl() + "riderPendingRide/",
            params: {
                Authorization: token
            },
            data: {
                tripId: rideId
            }
        });
    };

    service.tripReservedRiders = function(token, tripId) {
        return $http({
            method: "GET",
            url: getUrl() + "?filter[where][tripId]=" + tripId +
                "&filter[where][state]=reserved",
            params: {
                Authorization: token
            }
        });
    };
    
        service.getRiderInfo = function(token, tripId) {
        return $http({
            method: "POST",
            url: getUrl() + "driverPendingRide",
            data:{tripId: tripId},
            params: {
                Authorization: token
            }
        });
    };

    service.getRidersByTripId = function(token, id) {
        return $http.get(getUrl() + "driverReservedRide/" + "?filter[where][tripId]=" + id, {
            params: {
                access_token: token
            }
        });
    };
    
    service.getTripsByRideId = function(rideId, token){
	    return $http({
	        url: getUrl()+"riderMatchedRide?rideId="+rideId,
  		    params: { 
  		        Authorization: token
  		    }
           });
    };
    
    service.getDriverInfoByRideId = function(rideId, token){
        return $http({
            //https://ride-share-team-b-ssfmaster.c9users.io:8080/api/Matches/historyRiderResults?rideId=2
            method: "GET",
            url: getUrl()+"historyRiderResults?rideId="+rideId,
            params: {
    	        Authorization: token          
            }
      });  
    };
    
    service.getTripsByRiderId = function(token, rideId) {
        return $http({
            method: "POST",
            url: getUrl() + "riderMatchedTrip/",
            headers: {
                'Authorization': token
            },
            data: {
                rideId: rideId
            }
        });
    };
     service.getMatchedId = function(token, rideId, tripId){
        return $http({
            method: 'GET',
            url: getUrl() +
            "?filter[where][rideId]=" + rideId +
            "&filter[where][tripId]=" + tripId,
            params: {
                Authorization: token
            }
        });
    };
}
]);