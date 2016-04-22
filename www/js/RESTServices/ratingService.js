angular.module("RESTServices")

.service('RatingsService',[ 'SSFConfigConstants', '$http', '$q', '$window', function(SSFConfigConstants, $http, $q, $window) {
    var path = 'Ratings/',
    service = this;
    
    function getUrl () {
        return SSFConfigConstants.EndpointUrl.url + path;
    }
    
    
    service.giveRatingAndComment = function(data, token) {
        return $http({
            url: getUrl(),
            method: "POST",
            data: data,
            headers: {
                'Authorization': token
            }
        });
       
    };
    
}]);