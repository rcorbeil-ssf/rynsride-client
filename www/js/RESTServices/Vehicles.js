angular.module("RESTServices")

.service('VehicleService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'Vehicles/',
            service = this;
        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }

        service.byId = function(token, id) {
             return $http({
            url: getUrl() + id,
            method: "GET",
            headers: {
                'Authorization': token
            }
        });
        };
        service.getVehicleDetails = function(userId, token){
		    return $http.get(getUrl()+"?filter[where][userId]="+userId ,{
      	        params: { access_token: token }
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