angular.module("RESTServices")

.service('RatingsService',[ 'SSFConfigConstants', '$http', '$q', '$window', function(SSFConfigConstants, $http, $q, $window) {
    var path = 'Ratings/',
    service = this;
    
    function getUrl () {
        return SSFConfigConstants.EndpointUrl.url + path;
    }
     service.postRating = function(id, token) {
        return $http({
            url: getUrl(),
            method: "POST",
            headers: {
                'Authorization': token
            }
        });
       
    };
    
    service.postComment = function(id, token) {
        return $http({
            url: getUrl(),
            method: "POST",
            headers: {
                'Authorization': token
            }
        });
       
    };
    
}]);