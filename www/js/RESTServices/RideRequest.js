angular.module("RESTServices")

.service('RideRequestsService', ['SSFConfigConstants', '$http', '$q', '$window',
    function(SSFConfigConstants, $http, $q, $window) {
        var path = 'RideRequests/',
            userInfo,
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

        // USED FOR RIDER PAGE
        service.getRideData = function() {
            userId = $window.localStorage.userId;
            token = $window.localStorage.token;

            return $http({
                url: getUrl() +
                    '?filter[where][riderId]=' + userId,
                method: "GET",
                headers: {
                    'Authorization': token
                }
            });
        };

        service.getTripHistory = function(token, riderId, startDate) {
            return $http({
                url: getUrl() +
                    "?filter[where][riderId]=" + riderId +
                    "&filter[where][startDate][lt]=" + startDate +
                    "&filter[where][state][neq]=canceled",
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            });
        };
        service.getAllTripHistory = function(token, riderId, startDate){
            return $http({
                url: getUrl() +
                    "?filter[where][riderId]=" + riderId +
                    "&filter[where][startDate][lt]=" + startDate,
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            });
        };
        service.postRideData = function(token, data) {
            return $http({
                url: getUrl() + "requestRideAndSearch/",
                method: "POST",
                data: {requestedRide:data},
                headers: {
                    'Authorization': token
                }
            });
        };
        
        service.updateStates = function(token, rideId, data){
        	return $http({
        		url: getUrl()+"?filter[where][riderId]="+rideId,
        		method: 'PUT',
        		data: data,
        		headers: {
        			'Authorization': token
        		}
        	});
        };
           
        service.rateUser = function(userData){
            if(userData !== undefined)
                userInfo = userData;
            return userInfo;
        };
        
        service.changeState = function(token, rideId, state) {
            state =  {state:state};
            return $http({
                url: getUrl() +  rideId,
                method: "PUT",
                data: state,
                params: {
                    Authorization: token
                }
            });
        };

    }
]);
