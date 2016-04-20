angular.module('starter.services', [])
    // angular.module ('starter.services')
.service('TripServices', ['$window',
    function($window) {
        var service = this;
          var  tripData = {};

        service.currentTrip = function(setTrip){
            if(setTrip !== undefined)
                tripData = setTrip;
            return tripData;
        };
}])
.service('HistoryService', ['$window',
    function($window) {
        var service = this;
        var object;
        var driver;
        var historyData = {
            };
        service.listedHistory = function(listHist) {
            if (listHist !== undefined)
                historyData = listHist;
            return historyData;
        };
        service.saveTrip = function(trip){
            object = trip;
        };
        service.getTrip = function() {
            if (object !== undefined){
                return object;
            }  else {
                console.log('Error: Unable to get trip detail data using Resolve');
            }
        };
        service.getDriverInfo = function(){
        };
    }
])

.service('UserService', ['$window',
    function ($window){
    var service = this;
    var userEdit;
    var vehicleEdit;
    var userData;
    var vehicleData;
    service.getUserInfo = function(){
        return userData;
    };
    service.getVehicleInfo = function(){
        return vehicleData;
    };
    service.currentUserInfo = function(setData) {
            if (setData !== undefined) {
                userData = setData;
            } else {
                return userData;
            }
        };
    service.currentVehicleInfo = function(setData) {
        if (setData !== undefined) {
            vehicleData = setData;
        } else {
            return vehicleData;
        }
    };
    service.updateProfile = function(userData, vehicleData){
      userEdit = userData;
      vehicleEdit = vehicleData;
    };
}])
;
