angular.module('starter.controllers')

.controller('PostTripCtrl', ['$scope', '$state', '$ionicHistory', 'SSFTranslateService', '$window', 'PostedTripsService', '$ionicModal',
    function($scope, $state, $ionicHistory, SSFTranslateService, $window, PostedTripsService, $ionicModal) {
        // var geoPoint = {};
        $scope.tripArray = [];
        $scope.postedTrip = {};

        $scope.locationAllowed = function() {
            navigator.geolocation.getCurrentPosition(function(position) {
                
                $scope.postedTrip.starGeopoint = {
                    lng: position.coords.latitude,
                    lat: position.coords.longitude
                };
                var geoPoint = {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                };
                $scope.postTrip = function(form) {
                    if (form.$invalid) {
                        return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
                    }
                    else {
                        $scope.postedTrip = $scope.newTrip;
                        $scope.postedTrip.driverId = $window.localStorage.userId;
                        $scope.postedTrip.state = "new";
                        $scope.postedTrip.starGeopoint = geoPoint;
                        PostedTripsService.postTripData($scope.postedTrip);
                        console.log($scope.postedTrip);
                        console.log($scope.newTrip);
                        $state.go('driver');
                        $scope.newTrip = {};
                        
                    }
                };

            });
        };
        $scope.locationAllowed();
        
        $scope.newTrip = {
            startDate: new Date()
        };

        $ionicModal.fromTemplateUrl('startModal.html', function($ionicModal) {
            $scope.startModal = $ionicModal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $ionicModal.fromTemplateUrl('endModal.html', function($ionicModal) {
            $scope.endModal = $ionicModal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope.insertStart = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            }
            else {
                $scope.startModal.hide();
            }
        };

        $scope.insertEnd = function(form) {
            if (form.$invalid) {
                return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
            }
            else {
                $scope.endModal.hide();
            }
        };

    }
]);
