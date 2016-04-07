angular.module("RESTServices")

.service('MatchesService', ['SSFConfigConstants', '$http', '$q',
        function(SSFConfigConstants, $http, $q) {
    var path = 'Matches/';
    var service = this;
        
    function getUrl(){
        return SSFConfigConstants.EndpointUrl.url + path;
    }    
        service.matchedTrip = function(riderId, token) {
        //TODO: Add a remoteMethod in the backend for this
        
        var defer = $q.defer();
        defer.resolve({
            status: 200,
            data: [{
                tripId: "1",
			    riderId: "5",
			    dateStamp: "11:34am 4/10/2016", //(which includes time)
			    updateStamp: "",
			    state: "matched"	//string: matched, pendDrCmt, reserved, complete
            } , {
                tripId: "2",
			    riderId: "5",
			    dateStamp: "10:11am 4/7/2016", //(which includes time)
			    updateStamp: "",
			    state: "matched"	//string: matched, pendDrCmt, reserved, complete
            } , {
                tripId: "3",
			    riderId: "5",
			    dateStamp: "12:15pm 4/3/2016", //(which includes time)
			    updateStamp: "",
			    state: "matched"	//string: matched, pendDrCmt, reserved, complete
            } , {
                tripId: "4",
			    riderId: "5",
			    dateStamp: "8:00pm 4/13/2016", //(which includes time)
			    updateStamp: "",
			    state: "matched" 	//string: matched, pendDrCmt, reserved, complete
            }]
        });
  		return defer.promise;
	};
        service.updateTrip = function(token, tripId, newData) {
            var defer = $q.defer();
            defer.resolve({
                status: 200
            });
            return defer.promise;
        };
    }
]);