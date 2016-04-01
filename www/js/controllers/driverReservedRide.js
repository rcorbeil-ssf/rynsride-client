angular.module('starter.controllers')
    .controller('DriverReservedRideCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', 'SSFAlertsService', '$ionicPopover', '$window', 'PostedTripsService', 'SSFTranslateService', 'committedRiders', 'TripServices',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate, SSFAlertsService, $ionicPopover, $window, PostedTripsService, SSFTranslateService, committedRiders, TripServices) {
            //The trip details will be filled with the trip data from the backend.
            $ionicPopover.fromTemplateUrl('templates/popups/driverReservedPopup.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });
            $scope.committedRiders = committedRiders;
            
            
            //             $scope.rideStart = function() {
            //     $scope.tripDetails.state = "active";
            //     $scope.tripDetails.rideActive = true;

            // };
            
            
            
            
            
            $scope.tripDetails = TripServices.currentTrip();
            
            //Warn Driver of functionality
            $scope.cancelTrip = function() {
                $translate(['DRIVER_RESERVED_RIDE.CANCEL.WARNING', 'DRIVER_RESERVED_RIDE.CANCEL.PROMPT', 'DRIVER_RESERVED_RIDE.CANCEL.OK', 'DRIVER_RESERVED_RIDE.CANCEL.CANCEL']).then(function(translation) {
                        SSFAlertsService.showConfirm(translation['DRIVER_RESERVED_RIDE.CANCEL.WARNING'], translation['DRIVER_RESERVED_RIDE.CANCEL.PROMPT'], translation['DRIVER_RESERVED_RIDE.CANCEL.OK'], translation['DRIVER_RESERVED_RIDE.CANCEL.CANCEL']);
                    })
                    .then(function(response) {
                        if (response == true) {
                            // delete ride, notify riders, return to driver page
                            $state.go("driver");
                        }
                    });
            };
            
            
            $scope.tripUpdate = function(state) {
                var tempData = {
                    state: $scope.tripDetails.state
                };
                if (state == 'started') {
                    SSFTranslateService.showConfirm('DRIVER_RESERVED_RIDE.CANCEL.WARNING', 'DRIVER_RESERVED_RIDE.CANCEL.QUESTION')
                    .then(function(res) {
                        if (res == true) {
                            updateConfirmed(tempData);
                        } else {
                            
                        }
                    });
                } else if (state == 'canceled') {
                    SSFTranslateService.showConfirm('DRIVER_RESERVED_RIDE.CANCEL.WARNING', 'DRIVER_RESERVED_RIDE.CANCEL.PROMPT')
                    .then(function(res) {
                        if (res == true) {
                            updateConfirmed(tempData);
                         $state.go("driver");
                        } else {
                            
                        }
                    
                    });
                } else if (state == 'ended') {
                    
                }
            };
            
            function updateConfirmed(newData) {
                PostedTripsService.updateTrip($window.localStorage.token, $scope.tripDetails.id, newData)
                .then(function(response){
                    if(response.status == 200){
                        console.log(response);
                    } else {
                        
                    }
                });
            }
            
            $scope.displayRidersUniqueInfo = function($event, riders) {
                $scope.ridersPopupInfo = riders;
                // $scope.ridersPopupInfo.firstName = riders.name;
                // $scope.ridersPopupInfo.age = riders.age;
                // $scope.ridersPopupInfo.needWheelchair = riders.haveWheelchair;
                // $scope.ridersPopupInfo.haveDog = riders.haveDog;
                // $scope.ridersPopupInfo.startAfterTime = riders.startAfterTime;
                // $scope.ridersPopupInfo.startBeforeTime = riders.startBeforeTime;
                // $scope.ridersPopupInfo.startAddress = riders.startAddress;
                // $scope.ridersPopupInfo.destAddress = riders.destAddress;
                // $scope.ridersPopupInfo.phoneNumber = riders.cellNumber;
                // $scope.ridersPopupInfo.email = riders.email;
                // $scope.ridersPopupInfo.maxWillingToPay = riders.maxWillingToPay;
                // $scope.ridersPopupInfo.state = riders.state;
                // $scope.ridersPopupInfo.needReview = riders.needReview;

                return $scope.openPopover($event);
                // riders parameter should reference something like:
                // $scope.committedRiders[x]
                // use this to display to the html.
            };

            $scope.openPopover = function($event) {
                $scope.popover.show($event);

            };
            $scope.closePopover = function() {
                $scope.popover.hide();
            };
            
            $scope.rateMe = function(ridersPopupInfo) {
                $state.go("riderRating");
            };
            
            //committed riders will be pulled from matched RideRequest.
            // need to match riderID with user model. Pull specific model by filtering where UserID = RiderID. User preferences model needs to be included as well (email, cellphone #, age, photo)
            

            // $scope.userInfo = {
            //     "user": {
            //         "firstName": "Leif", // <---- changed property name from "name" to "firstName".
            //         "lastName": "", // <---- added property of "lastName" please remind to person making models.
            //         "address": "3000 University Ave, San Diego, CA 92104", //(JSON object) (encrypted)
            //         "email": "leif@leif.com", //(encrypted)
            //         "cellPhone": "909-210-5356", //(encrypted)
            //         "photo": "http://www.liveyachting.com/wp-content/uploads/2010/03/IMG_7130_SML.jpg",
            //         "gender": true, //(encrypted)
            //         "age": 21, //(encrypted)
            //         "facebookLoginAccount": "",
            //         "language": "en"
            //     },
            //     "preferences": {
            //         "userID": "123",
            //         "sameSexOnly": false,
            //         "ageRange": "18-30",
            //         "likesDogs": true,
            //         "needBikeRack": false,
            //         "needWheelchair": false

            //     }
            // };
            // This function will start the ride, ng-hide will return TRUE, hide the start button, then display the "Complete Ride".   

            //ride complete with iterate through $scope.committedRiders, set state to completed, go to the riders review page.
            $scope.rideComplete = function() {
                $scope.tripDetails.rideActive = false;
                $scope.tripDetails.state = "completed";
                for (var i = 0; i <= $scope.committedRiders.length - 1; i++) {
                    $scope.committedRiders[i].state = "completed";
                }
                $state.go("riderRating");
            };


            // this.onTabSelected = function(_scope) {

            //     // if we are selectng the driver title then 
            //     // change the state back to the top state
            //     if (_scope.title === 'Driver Page') {
            //         setTimeout(function() {
            //             $state.go('tab.driver', {});
            //         }, 20);
            //     }
            // };
        }
    ]);