angular.module("RESTServices")

.service('GetDriverInfoService', ['$q', 
    function($q) {
        var service = this;
        var infoOfDriver = {
            mockUserID: 1,
            firstName: 'Ryan',
            lastName: 'McQuilkin',
            age: '27',
            gender: 'Male',
            photo: "https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D"
        };
       service.getDriverInfo = function(data) {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: infoOfDriver
            });
            return defer.promise;
        };
    }
]);