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
    
    service.getLocalTrips = function(token, geolocation, userId) {
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
    //used by lobby page to get all trips 
     service.allTrips = function(token) {
        return $http({
            url: getUrl(), 
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

   

    service.getDriverHistory = function(userId, startDate, token) {
        //TODO: Add a remoteMethod in the backend for this
       return $http({
			  url: getUrl()+
			  		"?filter[where][driverId]="+userId + 
			  		"&filter[where][startDate][lt]="+startDate +
			  		"&filter[where][state][neq]=canceled",
			  method: 'GET',
      	  headers: { 'Authorization': token }
   		});
	};

	// TODO: Need a getTripByTripId.
	//      -Needs to talk to postedtrips model, filtered by tripId.
	//      -Returns trip object.
	
	service.changeState = function(token, tripId, state) {
            state =  {state:state};
            return $http({
                url: getUrl() +  tripId,
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
