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
        service.updateUser = function(userId, token, changedInfo) {
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
                url: getUrl() + "logout",
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
            return $http({
                url: getUrl()+"?filter[where][id]="+userId, 
                method: "GET",
                headers: {
                    'Authorization': token
                }
            });
        };
    }
]);