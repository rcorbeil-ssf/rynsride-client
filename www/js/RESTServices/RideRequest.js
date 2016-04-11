angular.module("RESTServices")

.service('RideRequestsService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'RideRequests/',
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

        service.getRideData = function(userId, token, date) {

            userId = "2";
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
        
    }
]);

