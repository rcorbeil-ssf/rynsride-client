angular.module("RESTServices", [])

.service('ActivityService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'PostedTrips/',
            service = this;

        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }
        service.getActivityInfo = function(geopoint) {

            return $http({
                url: getUrl() + "locationAllowed/",
                method: "GET",
            });
        };
    }
]);