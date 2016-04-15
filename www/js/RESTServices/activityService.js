angular.module("RESTServices", [])

.service('ActivityService', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'PostedTrips/',
            service = this;

        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }
        service.locationAllowed = function(geopoint) {

            return $http({
                url: getUrl() + "locationAllowed/",
                method: "GET",
            });
        };
        service.locationBlocked = function(date, token) {
            //add location later
            date = "2010-03-10T00:00:00.000";
            //TODO: locations and paging
            //'?filter[where][startDate][gt]=' + date + '&filter[limit]=5'
            return $http({
                url: getUrl() + "getNames" +
                    '?filter[where][startDate][gt]=' + date,
                method: "GET",
                headers: {
                    'Authorization': token
                }
            });
        };
    }
]);