angular.module('starter.controllers')
    .controller('DriverReservedRideCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
            'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', 'SSFAlertsService', '$ionicPopover',
            function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate, SSFAlertsService, $ionicPopover) {
                //The trip details will be filled with the trip data from the backend.
                $ionicPopover.fromTemplateUrl('templates/popups/driverReservedPopup.html', {
                    scope: $scope
                }).then(function(popover) {
                    $scope.popover = popover;
                });
                
                $scope.displayRidersUniqueInfo = function($event, riders){
                        $scope.ridersPopupInfo = {};
                        $scope.ridersPopupInfo.firstName = riders.name;
                        $scope.ridersPopupInfo.age = "";
                        $scope.ridersPopupInfo.needWheelchair = "";
                        $scope.ridersPopupInfo.haveDog = riders.haveDog;
                        $scope.ridersPopupInfo.startAfterTime = riders.startAfterTime;
                        $scope.ridersPopupInfo.startBeforeTime = riders.startBeforeTime;
                        $scope.ridersPopupInfo.startAddress = riders.startAddress;
                        $scope.ridersPopupInfo.destAddress = riders.destAddress;
                        $scope.ridersPopupInfo.phoneNumber = "";
                        $scope.ridersPopupInfo.email = "";
                        $scope.ridersPopupInfo.maxWillingToPay = riders.maxWillingToPay;
                    
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
                $scope.tripDetails = {
                    driverID: "122",
                    startAddress: "1748 San Diego Ave, San Diego, CA 92110", //(JSON object)
                    startGeopoint: "32.743414, -117.182739", // (lon,lat)
                    destAddress: "1530 Pike Place, Seattle, WA 98101", // (JSON object)
                    destGeopoint: "47.609561, -122.341505",
                    startDate: "4/22/2016",
                    startTime: "06:00pm",
                    expectedEndTime: "06:00",
                    seatsAvailable: "2",
                    roundTrip: "true",
                    dogOK: "false",
                    estimatedSharedExpense: "20",
                    rideActive: false, //Need to add a "ride active" property as a way to show/hide buttons on html.
                    state: "reserved" //By setting state to "complete", the ride will be complete, and the accompanying function will pass the completed trip into the driver history
                };
                //committed riders will be pulled from matched RideRequest.
                // need to match riderID with user model. Pull specific model by filtering where UserID = RiderID.
                // INFORMATION NEEDED:  USER.AGE, USER.NEEDWHEELCHAIR
                $scope.committedRiders = [{
                    name: "James Boogaloo",
                    riderID: "1",
                    startAddress: "1337 Leet Dr., San Diego, CA 92110",
                    startGeopoint: "32.753414, -118.182739", // (lon,lat) 
                    destAddress: "705 Pike St, Seattle, WA 98101",
                    destGeopoint: "47.612049, -122.332292",
                    startDate: "04/22/2016",
                    startAfterTime: "05:00pm",
                    startBeforeTime: "08:00pm",
                    seatsRequired: "1",
                    roundTrip: false,
                    haveDog: false,
                    maxWillingToPay: "60",
                    cellNumber: "909-210-5356",
                    state: "reserved" //This is similar to rideCompleted, giving the property of a completed trip, accompanying function will then be able to be stored into rider history page.

                }, {
                    name: "Leif Meister",
                    riderID: "2",
                    startAddress: "3232 Fake Ln, La Mesa, CA 92110",
                    startGeopoint: "32.771139, -117.030657", // (lon,lat) 
                    destAddress: "1001 Western Ave, Seattle, WA 98104",
                    destGeopoint: "47.604322, -122.337528",
                    startDate: "04/22/2016",
                    startAfterTime: "06:00pm",
                    startBeforeTime: "07:30pm",
                    seatsRequired: "1",
                    roundTrip: false,
                    haveDog: false,
                    maxWillingToPay: "65",
                    state: "reserved"
                }, {
                    name: "Oscar Ripper",
                    riderID: "3",
                    startAddress: "3537 Wightman St, San Diego, CA 92104",
                    startGeopoint: "32.747845, -117.117068", // (lon,lat) 
                    destAddress: "1436 SE Taylor St, Portland, OR 97214",
                    destGeopoint: "45.514932, -122.650998",
                    startDate: "04/22/2016",
                    startAfterTime: "06:00pm",
                    startBeforeTime: "07:30pm",
                    seatsRequired: "1",
                    roundTrip: false,
                    haveDog: false,
                    maxWillingToPay: "75",
                    cellNumber: "6193844231",
                    state: "reserved"
                }];

                $scope.userInfo = {
                    "user": {
                        "firstName": "Leif", // <---- changed property name from "name" to "firstName".
                        "lastName": "", // <---- added property of "lastName" please remind to person making models.
                        "address": "3000 University Ave, San Diego, CA 92104", //(JSON object) (encrypted)
                        "email": "leif@leif.com", //(encrypted)
                        "cellPhone": "909-210-5356", //(encrypted)
                        "photo": "http://www.liveyachting.com/wp-content/uploads/2010/03/IMG_7130_SML.jpg",
                        "gender": true, //(encrypted)
                        "age": 21, //(encrypted)
                        "facebookLoginAccount": "",
                        "language": "en"
                    },
                    "preferences": {
                        "userID": "123",
                        "sameSexOnly": false,
                        "ageRange": "18-30",
                        "likesDogs": true,
                        "needBikeRack": false,
                        "needWheelchair": false

                    }};
                    // This function will start the ride, ng-hide will return TRUE, hide the start button, then display the "Complete Ride".   
                    $scope.rideStart = function() {
                        $scope.tripDetails.state = "active";
                        $scope.tripDetails.rideActive = true;

                    };
                    //ride complete with iterate through $scope.committedRiders, set state to completed, go to the riders review page.
                    $scope.rideComplete = function() {
                        $scope.tripDetails.rideActive = false;
                        $scope.tripDetails.state = "completed";
                        for (var i = 0; i <= $scope.committedRiders.length - 1; i++) {
                            $scope.committedRiders[i].state = "completed";
                        }
                        //$state.go("riderRating");
                    };

                    //Warn Driver of functionality
                    $scope.cancelTrip = function() {
                        $translate(['CANCEL.WARNING', 'CANCEL.PROMPT']).then(function(translation) {
                                SSFAlertsService.showAlert(translation['CANCEL.WARNING'], translation['CANCEL.PROMPT']);
                            })
                            .then(function(response) {
                                if (response == true) {
                                    // delete ride, notify riders, return to driver page
                                }
                            });
                    };
                }
            ]);