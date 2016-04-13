angular.module("RESTServices")

.service('VehicleService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'Vehicles/',
            service = this;
        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }

        service.byId = function() {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: {
                    bikeRack: true,
                    wheelchair: false
                }
            });
            return defer.promise;
        };
        service.getVehicleDetails = function(userId, token){
		    return $http({
		        method: 'GET',
		        url: getUrl()+"?filter[where][userId]="+userId,
		        headers: {
      	            'Authorization': token
		        }
   		    });
		};
		
		
		service.updateVehicleDetails = function(userId, token, data){
		    return $http({
			    url: getUrl()+"?filter[where][userId]="+userId,
			    method: 'PUT',
			    data: data,
      	        headers: { 'Authorization': token }
   	        });
        };
}]);