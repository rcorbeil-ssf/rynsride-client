angular.module("RESTServices", [])

.service('ActivityService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'PostedTrips/',
            service = this;

        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }
        service.locationAllowed = function() {
            return $http({
                url: getUrl() + "locationAllowed/",
                method: "GET",
            });
        };
        service.locationBlocked = function() {
            return $http({
                url: getUrl(),
                method: "GET",
                // headers: {
                //     'Authorization': token
                // }
            });
        };
    }
]);