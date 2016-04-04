angular.module("RESTServices")

.service('UpdateUser', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'RideRequests/',
            service = this;
        // function getUrl() {
        //     return SSFConfigConstants.EndpointUrl.url + path;
        // }

        //  Return trips that have not been completed
        //  Only related to a specific driver
        service.riderPendingTripCanceled = function(token, data) {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
            });
            return defer.promise;

            // return $http({
            //     url:getUrl() + <id>,
            //     data: data,
            //     method: "PUT",
            //     params: {
            //         Authorization: token
            //     }
            // })
        };
    }
]);