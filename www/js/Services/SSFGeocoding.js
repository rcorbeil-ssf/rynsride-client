/*global ionic*/
/*global angular*/
/*global navigator*/
angular.module('SSFGeolocation', [])
.service('SSFGeolocationService', ["$q", function ($q) {

    var service = this;
    var geocoder = new google.maps.Geocoder();
    
    //requires the installation of cordova-plugin-geolocation
    //returns promise
    //resolve: position object
    //reject: error object
    /*
    SSFGeolocationService.getCurrentPosition().
    then(function(position){
        console.log("lat = " + position.coords.latitude + "; Lon = " + position.coords.longitude); 
    , function(error){
        console.log(error);
    });
    }
    */
    service.getCurrentPosition = function() {
        
        var defer = $q.defer();
        
        //position.coords.latitude
        //position.coords.longitude
        //position.coords.altitude
        //position.coords.accuracy
        //position.coords.altitudeAccuracy
        //position.coords.heading
        //position.coords.speed
        //position.timestamp
        var onSuccess = function(position) {
            defer.resolve(position);
        };

        // onError Callback receives a PositionError object
        //
        var onError = function(error) {
            defer.reject(error);
        };
        
        // will execute when device is ready, or immediately if the device is already ready.
        ionic.Platform.ready(function(){
            navigator.geolocation.getCurrentPosition(onSuccess,onError);
        });

        
        return defer.promise;
    }; 
    
    //requires the google maps javascript API script to be loaded in index.html along with an API Key
    //Geocode address
    //address: string
    //returns promise
    //resolve: object { lat, lng }
    //reject: string
    /*  SSFGeolocationService.geocodeAddress($scope.form.address)
        .then(function(response){
            console.log("lat = " + response.lat + "; Lon = " + response.lng);            
        }, function(error){
            console.log(error);
        });
    */
    service.geocodeAddress = function(address){
        var defer = $q.defer();
        geocoder.geocode({"address": address}, 
        function(results, status){
            if(status === "OK") {
                var location = {
                    "lat" : results[0].geometry.location.lat(),
                    "lng" : results[0].geometry.location.lng()
                };
                defer.resolve(location);
            }else {
                defer.reject(status);
            }
        });
        return defer.promise;
    };
    
    //requires the google maps javascript API script to be loaded in index.html along with an API Key
    //Reverse Geocode
    //pointLocation : {lat, lng}
    //resolve: string
    //reject: string
    /*  SSFGeolocationService.reverseGeocode(pointLocation)
        .then(function(address){
            console.log(address);
        },function(error){
           console.log(error);   
        });
    */
    service.reverseGeocode = function(pointLocation){
        var defer = $q.defer();
        geocoder.geocode({"location": pointLocation}, 
        function(results, status){
            if(status === "OK") {
                console.log(results);
                if (results[0]) {
                    defer.resolve(results[0].formatted_address);
                }
            }else {
                defer.reject(status);
            }
        });
        return defer.promise;
    };
    
    
}]);