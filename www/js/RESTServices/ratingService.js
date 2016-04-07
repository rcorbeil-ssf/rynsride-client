angular.module("RESTServices")

.service('RatingService',[ 'SSFConfigConstants', '$http', '$q', function(SSFConfigConstants, $http, $q) {
    var path = '//some path/',
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