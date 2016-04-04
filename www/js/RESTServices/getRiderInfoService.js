angular.module("RESTServices")

.service('GetRiderInfoService', ['$q', 
    function($q) {
        var service = this;
        var infoOfRider = {
            mockUserID: 1,
            firstName: 'Ryan',
            lastName: 'Corbeil',
            age: '27',
            gender: 'Male',
            photo: "https://glip-vault-1.s3.amazonaws.com/web/customer_files/43395096588/modified.jpg?Expires=2075494478&AWSAccessKeyId=AKIAJROPQDFTIHBTLJJQ&Signature=Wl76EIDkGQOhsaFYAwJkOkBgB6M%3D"
        };
        service.getRiderInfo = function(data) {
            var defer = $q.defer();
            defer.resolve({
                status: 200,
                data: infoOfRider
            });
            return defer.promise;
        };
    }
]);