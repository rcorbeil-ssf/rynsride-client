angular.module("RESTServices")

.service('PostedTripsService', ['SSFConfigConstants', '$http', '$q', "$window",
    function(SSFConfigConstants, $http, $q, $window) {
        var path = 'PostedTrips/',
            service = this;

    function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }     

    // USED FOR POST TRIP PAGE
    service.postTripData = function(data, token) {
        return $http({
            url: getUrl() + "postAndSearch/",
            method: "POST",
            data: {postedTrip: data},
            headers: {
                'Authorization': token
            }
        });
    };

    // USED FOR DRIVER PAGE
    service.getRidersByTripId = function(tripID, token, date, userId) {
        userId = $window.localStorage.userId;
        // userId = "2";
        date = "2016-01-20T00:00:00.000";
        return $http({
            url: getUrl() +
                 '?filter[where][driverId]=' + userId,
            method: "GET",
            headers: {
                'Authorization': token
            }
        });
    };
    
    // USED FOR LOBBY PAGE
    // service.getLocalTrips = function(token) {
    //     //add location later
    //     var geopoint = {lat: 1, lng: 1};
    //     return $http({
    //         data: {
    //             geolocation: geopoint,
    //             userId: $window.localStorage.userId
    //         },
    //         url: getUrl() + "getNames/",
    //         method: "POST",
    //         headers: {
    //             'Authorization': token
    //         }
    //     });
    // };
    service.getLocalTrips = function(geolocation, token) {
        var userId = $window.localStorage.userId;
        return $http({
            url: getUrl() + "getNames/",
            method: "POST",
            data: {
                geolocation: geolocation,
                userId: userId
            },
            headers: {
                'Authorization': token
            }
        });
    };
    
    service.getTrip = function(token, driverId) {
        return $http({
            url: getUrl() + "getDriverInfo/", 
            method: "GET",
            headers: {
                'Authorization': token
            }
        });
    };
    

    //update a specific instace by id and change the state to started/canceled/completed.
    //Also needs to notify riders based on which state it is
    service.updateTrip = function (token, tripId, newData) {
         return $http({
                url:getUrl() + tripId,
                method: "PUT",
                data: newData,
                params: {
                    Authorization: token
                }
            });
    };

    service.getMatchedTrips = function(rideId, state, token) {
        //TODO: Add a remoteMethod in the backend for this
        var defer = $q.defer();
        defer.resolve({
            status: 200,
            data: [{
            }]
        });
  		return defer.promise;
	};

    service.getDriverHistory = function(userId, startDate, token) {
        //TODO: Add a remoteMethod in the backend for this
       return $http({
			  url: getUrl()+
			  		"?filter[where][driverId]="+userId + 
			  		"&filter[where][startDate][lt]="+startDate,
			  method: 'GET',
      	  headers: { 'Authorization': token }
   		});
	};

	// TODO: Need a getTripByTripId.
	//      -Needs to talk to postedtrips model, filtered by tripId.
	//      -Returns trip object.
	
	service.changeState = function(token, userId, state) {
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
        
        service.updateStates = function(driverId, data, token){
    	return $http({
    		url: getUrl()+"?filter[where][driverId]="+driverId,
    		method: 'PUT',
    		data: data,
    		headers: {
    			'Authorization': token
    		}
    	});
    };   
}]);
