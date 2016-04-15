angular.module("RESTServices")


.service('UpdatePhoto', ['SSFConfigConstants', '$http', '$q',
    function(SSFConfigConstants, $http, $q) {
        var path = 'SSFusers/',
            service = this;

        function getUrl() {
            return SSFConfigConstants.EndpointUrl.url + path;
        }

        service.uploadPhoto = function(fileObj, userId, token) {
            var fd = new FormData();
            fd.append('file', fileObj);
            fd.append('userId', userId);
            console.log(fd);

            return $http.post(getUrl() + "upload", fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                },
                params: {
                    Authorization: token
                }
            });
        };
    }
]);
