angular.module("RESTServices")

.service('RatingsService',[ 'SSFConfigConstants', '$http', '$q', function(SSFConfigConstants, $http, $q) {
    var path = 'Ratings/',
    service = this;
    var ratingAndComment = {};
    service.giveRatingAndComment = function(data) {
        var defer = $q.defer();
        defer.resolve({
            status: 200,
            data: ratingAndComment
        });
        return defer.promise;
    };
    
}]);