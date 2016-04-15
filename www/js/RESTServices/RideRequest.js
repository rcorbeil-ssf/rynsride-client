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
        service.getRideData = function(userId, token, date) {
            userId = $window.localStorage.userId;
            // userId = "2";
            date = "2016-01-20T00:00:00.000";
            return $http({
                url: getUrl() +
                    '?filter[where][riderId]=' + userId,
                method: "GET",
                headers: {
                    'Authorization': token
                }
            });
        };

        service.getTripHistory = function(riderId, startDate, token) {
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

        service.postRideData = function(data, token) {
            return $http({
                url: getUrl(),
                method: "POST",
                data: data,
                headers: {
                    'Authorization': token
                }
            });
        };
        
        service.updateStates = function(rideId, data, token){
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

    }
]);
