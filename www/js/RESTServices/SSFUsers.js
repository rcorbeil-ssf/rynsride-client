angular.module("RESTServices")

.service('UsersService', ['SSFConfigConstants', '$http', '$q',
        function(SSFConfigConstants, $http, $q) {
    var path = 'SSFUsers/',
    service = this;
    // var url = SSFConfigConstants.EndpointUrl.url;
    function getUrl() {
        return SSFConfigConstants.EndpointUrl.url + path;
    }
    service.create = function(newUser) {
        return $http({
            url: getUrl(),
            method: "POST",
            data: newUser
        });
        // return $http.post(getUrl, newUser);
    };
    service.login = function(user) {
        user["ttl"] = 1209600000;
        return $http.post(getUrl() + "login", user);
    };
    service.updateUser = function(token, userId, changedInfo) {
        return $http({
            url: getUrl()+userId,
            method: "PUT",
            data: changedInfo,
            headers: {
                'Authorization': token
            }
        });
    };
    service.logout = function(token) {
        return $http({
            url: getUrl()+"logout",
            method: "POST",
            headers: {
                'Authorization': token
            }
        });
    };
    service.getIP = function() {
        return $http({
            url: 'https://api.ipify.org',
            method: "GET",
        });
    };
    service.getUserInfo = function(userId, token) {
        var defer = $q.defer();
         defer.resolve({
            status: 200,
            data: {
                "firstName": "Leif", // <---- changed property name from "name" to "firstName".
                "lastName": "", // <---- added property of "lastName" please remind to person making models.
                "address": "3000 University Ave, San Diego, CA 92104", 	//(JSON object) (encrypted)
                "email": "leif@leif.com",	//(encrypted)
                "cellPhone": "909-210-5356",	//(encrypted)
                "photo": "http://www.liveyachting.com/wp-content/uploads/2010/03/IMG_7130_SML.jpg",
                "gender": true,	//(encrypted)
                "age": 21,		//(encrypted)
                "facebookLoginAccount": "", 
                "language": "en",
                "userID": "123",
                "sameSexOnly": false,
                "ageRange": "18-30",
                "likesDogs": true,
                "needBikeRack": false,
                "needWheelchair": false,
                "avgRating": 4.5
            }
        });
  		return defer.promise;
    };
    service.getDriverInfo = function(riderId, token) {
        var defer = $q.defer();
         defer.resolve({
            status: 200,
            data: {
                "firstName": "Oscar", // <---- changed property name from "name" to "firstName".
                "lastName": "", // <---- added property of "lastName" please remind to person making models.
                "address": "3000 University Ave, San Diego, CA 92104", 	//(JSON object) (encrypted)
                "email": "leif@leif.com",	//(encrypted)
                "cellPhone": "909-210-5356",	//(encrypted)
                "photo": "http://www.liveyachting.com/wp-content/uploads/2010/03/IMG_7130_SML.jpg",
                "gender": true,	//(encrypted)
                "age": 21,		//(encrypted)
                "facebookLoginAccount": "", 
                "language": "en",
                "userID": "123",
                "sameSexOnly": false,
                "ageRange": "18-30",
                "likesDogs": true,
                "needBikeRack": false,
                "needWheelchair": false,
                "driverIdID": "123",
                "year": 2010,
                "make": "Jaguar",
                "model": "F-Type",
                "color": "Metallic Silver",
                "licensePlate": "7EDASDAS", //(encrypt)
                "bikeRack": "",
                "wheelchairAccessible": "",
                "vehiclePhoto": "http://cdn.pursuitist.com/wp-content/uploads/2013/11/jaguar2.jpg"
            }
        });
  		return defer.promise;
    };
}]);