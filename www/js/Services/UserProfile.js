angular.module('starter.services')
    // angular.module ('starter.services')
.service('ProfileShareService', 
        ['$window', 
function($window){
    var service = this;
    var user;
    var vehicle;
    service.userInfo = function(userInfo){
        if (userInfo !== undefined){
            user = userInfo;
        } else {
            return user;
        }
    };
    service.vehicleInfo = function(vehicleInfo){
        if (vehicleInfo !== undefined){
            vehicle = vehicleInfo;
        } else {
            return vehicle;
        }
    };
}])
;
