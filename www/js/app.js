// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.rating', 'starter.controllers',
    'ionic-material', 'pascalprecht.translate', 'SSFConfig', 'SSFAlerts', 'SSFCache',
    'SSFConnectivity', 'SSFCss', 'SSFDirectives', 'SSFFavorites', 'SSFLogout',
    'SSFMailComposer', 'SSFSpinner', 'SSFTranslate', 'RESTServices', 'starter.services', 'SSFGeolocation', 
])

.run(["$ionicPlatform", '$window', '$ionicHistory', '$state', '$rootScope',
    function($ionicPlatform, $window, $ionicHistory, $state, $rootScope) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.lightConent();
            }
            // Ionic.io();
            // //Dispatch interval, how often do we want our events to be sent to analytics. Default is 30 sec
            // if($window.localStorage["userId"]) {
            //   $ionicAnalytics.setGlobalProperties({
            //     ZibID: $window.localStorage["userId"]
            //   });
            // }
        });
    }
])

.run(['$rootScope', function($rootScope) {
    $rootScope.hideFooter = false;
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            $rootScope.hideFooter =
                toState.url === '/' ||
                toState.url === '/login' ||
                toState.url === '/register' ||
                toState.url === '/wizardActivity' ||
                toState.url === '/eula';
        }
    );
}])

.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider

        //DRIVER
            .state('driver', {
                url: '/driver',
                templateUrl: 'templates/driver/driver.html',
                controller: 'DriverCtrl',
                cache: false,
                resolve: {
                    translation: ['SSFTranslateService', function(SSFTranslateService) {
                        return SSFTranslateService.translate(["DROPDOWNS.ALL", "DROPDOWNS.NEW", "DROPDOWNS.PENDING", "DROPDOWNS.RESERVED"])
                            .then(function(response) {
                                return response;
                            });
                    }],
                    getTrips: ['PostedTripsService', function(PostedTripsService) {
                        return PostedTripsService.getRidersByTripId()
                            .then(function(response) {
                                if (response.status === 200) {
                                    return response.data;
                                }
                                else {
                                    // SSFTranslateService.showAlert('', '')
                                    // $state.go('');
                                }
                                return {};
                            }, function(error) {
                                console.log(error);
                                alert("error");
                            });
                    }],

                }
            })
            .state('driverPendingTrip', {
                url: '/driverPendingTrip',
                templateUrl: 'templates/driver/driverPendingTrip.html',
                controller: 'DriverPendingTripCtrl',
                resolve: {
                    getRiderDetails: ['RiderTripDetailsService', 'MatchesService', '$window', function(RiderTripDetailsService, MatchesService, $window){
                        
                       var riderInfo = RiderTripDetailsService.currentRide();
                        return  MatchesService.getRiderInfo($window.localStorage.token, riderInfo.id)
                             .then(function(res){
                            return res.data[0];
                        });
                    }]
                }
            })
            .state('driverReservedRide', {
                url: '/driverReservedRide',
                templateUrl: 'templates/driver/driverReservedRide.html',
                controller: 'DriverReservedRideCtrl',
                resolve: {
                    committedRiders: ['$window', 'MatchesService', 'SSFTranslateService', 'RiderTripDetailsService', function($window, MatchesService, SSFTranslateService, RiderTripDetailsService) {
                        // need to communicate with Driver page to be able to pass through the trip object so we can do the "getRidersByTripId"
                        // function.
                        var trip = RiderTripDetailsService.currentRide();
                        return MatchesService.getRidersByTripId($window.localStorage.token, trip.id)
                            .then(function(res) {
                                if (res.status == 200) {
                                    console.log(res.data);
                                    return res.data;
                                }
                                else {
                                    console.log("this is where it failed");
                                }
                                return {};
                            }, function(err) {
                                if (err.status == 422) {
                                    SSFTranslateService.showConfirm('DRIVER_RESERVED_RIDE.CANCEL.WARNING', 'DRIVER_RESERVED_RIDE.START.PROMPT')
                                        .then(function(res) {
                                            if (res == true) {

                                            }
                                            return {};
                                        });
                                }
                            });
                    }],
                    currentTrip: ['$window', 'MatchesService', 'SSFTranslateService', 'RiderTripDetailsService', function($window, MatchesService, SSFTranslateService, RiderTripDetailsService) {
                        return RiderTripDetailsService.currentRide();
                    }]
                }
            })
            .state('driverTripDetails', {
                url: '/driver-trip-details',
                templateUrl: 'templates/driver/driverTripDetails.html',
                controller: 'DriverTripDetailsCtrl',
                resolve: {
                    riders: ["TripServices", "MatchesService", "$window",
                        function(TripServices, MatchesService, $window) {
                            // riders: [function() {MatchesService
                            var trip = TripServices.currentTrip();
                            return MatchesService.tripPendDrCommit($window.localStorage.token, trip.id)
                                .then(function(res) {
                                    console.log(res);
                                    return res;
                                }, function(err) {
                                    console.error('Failed.', err);
                                    return err;
                                });

                            // if(trip.state === "new"){
                            //     return [];
                            // }else{
                            //     return []; //TODO: connect an actual api
                            // }
                        }
                    ]

                }
            })

        //FORMS
            .state('login', {
                url: '/login',
                templateUrl: 'templates/forms/login.html',
                controller: 'LoginCtrl'
            })
        .state('postTrip', {
            url: '/postTrip',
            templateUrl: 'templates/forms/postTrip.html',
            controller: 'PostTripCtrl',
            resolve: {
                useCurrentPos: ["SSFGeolocationService", "$window",
                    function(SSFGeolocationService, $window) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            var currentGeoPoint = {
                                lng: position.coords.longitude,
                                lat: position.coords.latitude
                            };                
                            
                            SSFGeolocationService.reverseGeocode(currentGeoPoint)
                            .then(function(address){
                                console.log(address);
                                
                                var arrayOfStrings = address.split(", ");
                                var stateZip = arrayOfStrings[2].split(" ");
                                var addrObj = {
                                    street: arrayOfStrings[0],
                                    city: arrayOfStrings[1],
                                    state: stateZip[0],
                                    zip: stateZip[1]} ;
                                console.log(addrObj);
                                
                                $window.localStorage.curPos = JSON.stringify(addrObj);
                                console.log($window.localStorage.curPos);
                            }, function(error){
                                console.log(error);
                            }); 
                        }, function(err) {
                            console.error(err);
                            return err;
                        });
                    } 
                ]
             }                
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/forms/register.html',
                controller: 'RegisterCtrl'
            })
            .state('requestRide', {
                url: '/requestRide',
                templateUrl: 'templates/forms/requestRide.html',
                controller: 'RequestRideCtrl',
                resolve: {
                    useCurrentPos: ["SSFGeolocationService", "$window",
                        function(SSFGeolocationService, $window) {
                            navigator.geolocation.getCurrentPosition(function(position) {
                                var currentGeoPoint = {
                                    lng: position.coords.longitude,
                                    lat: position.coords.latitude
                                };                
                                
                                SSFGeolocationService.reverseGeocode(currentGeoPoint)
                                .then(function(address){
                                    console.log(address);
                                    
                                    var arrayOfStrings = address.split(", ");
                                    var stateZip = arrayOfStrings[2].split(" ");
                                    var addrObj = {
                                        street: arrayOfStrings[0],
                                        city: arrayOfStrings[1],
                                        state: stateZip[0],
                                        zip: stateZip[1]} ;
                                    console.log(addrObj);
                                    
                                    $window.localStorage.curPos = JSON.stringify(addrObj);
                                    console.log($window.localStorage.curPos);
                                }, function(error){
                                    console.log(error);
                                }); 
                            }, function(err) {
                                console.error(err);
                                return err;
                            });
                        } 
                    ]
                 }      
            })

        //HISTORY
            .state('historyDriver', {
                url: '/historyDriver',
                templateUrl: 'templates/history/historyDriver.html',
                controller: 'HistoryDriverCtrl',
                resolve: {
                    previousTrips: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                        var date = new Date().toUTCString();
                        return PostedTripsService.getDriverHistory($window.localStorage.userId, date, $window.localStorage.token)
                            .then(function(res) {
                                if (res.status == 200) {
                                    console.log(res);
                                    return res.data;
                                }
                                else {

                                }
                                return {};
                            }, function(err) {
                                if (err.status == 422) {
                                    SSFTranslateService.showConfirm('DRIVER_RESERVED_RIDE.CANCEL.WARNING', 'DRIVER_RESERVED_RIDE.START.PROMPT')
                                        .then(function(res) {
                                            if (res == true) {

                                            }
                                            return {};
                                        });
                                }
                            });
                    }],
                    previousRiders: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                        return "";
                    }],
                    selectedTrip: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                        return "";
                    }]
                }
            })
            .state('historyDriverResults', {
                url: '/historyDriverResults',
                templateUrl: 'templates/history/historyDriverResults.html',
                controller: 'HistoryDriverCtrl',
                resolve: {
                    previousTrips: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                        return "";
                    }],
                    previousRiders: ['$window', 'PostedTripsService', 'SSFTranslateService', 'HistoryService', 'MatchesService', function($window, PostedTripsService, SSFTranslateService, HistoryService, MatchesService) {
                        var trip = HistoryService.getTrip(); // = to service that shares the "trip with Resolve"
                        return MatchesService.getRidersByTripId($window.localStorage.token, trip.tripId)
                            .then(function(res) {
                                if (res.status == 200) {
                                    console.log(res.data);
                                    return res.data;
                                }
                                else {
                                    console.log('Error');
                                }
                            });
                    }],
                    selectedTrip: ['$window', 'PostedTripsService', 'SSFTranslateService', 'HistoryService', function($window, PostedTripsService, SSFTranslateService, HistoryService) {
                        var trip = HistoryService.getTrip();
                        return trip;
                    }]
                }
            })
            .state('historyRider', {
                url: '/historyRider',
                templateUrl: 'templates/history/historyRider.html',
                controller: 'HistoryRiderCtrl',
                resolve: {
                    previousRides: ['$window', 'RideRequestsService', 'SSFTranslateService', function($window, RideRequestsService, SSFTranslateService) {
                        // window local storage possibly temporary. 
                        // May need to change based on what log in 
                        // function saves userId as.
                        var currentDate = new Date();
                        return RideRequestsService.getTripHistory($window.localStorage.token, $window.localStorage.userId, currentDate)
                            .then(function(res) {
                                if (res.status == 200) {
                                    console.log(res);
                                    return res.data;
                                }
                                else {

                                }
                                return {};
                            }, function(err) {
                                if (err.status == 422) {
                                    SSFTranslateService.showConfirm('DRIVER_RESERVED_RIDE.CANCEL.WARNING', 'DRIVER_RESERVED_RIDE.START.PROMPT')
                                        .then(function(res) {
                                            if (res == true) {

                                            }
                                            return {};
                                        });
                                }
                            });
                    }],
                    allPastRides: ['$window', 'RideRequestsService', 'SSFTranslateService', function($window, RideRequestsService, SSFTranslateService) {
                        // window local storage possibly temporary. 
                        // May need to change based on what log in 
                        // function saves userId as.
                        var currentDate = new Date();
                        return RideRequestsService.getAllTripHistory($window.localStorage.token, $window.localStorage.userId, currentDate)
                            .then(function(res) {
                                if (res.status == 200) {
                                    console.log(res);
                                    return res.data;
                                }
                                else {

                                }
                                return {};
                            }, function(err) {
                                if (err.status == 422) {
                                    SSFTranslateService.showConfirm('DRIVER_RESERVED_RIDE.CANCEL.WARNING', 'DRIVER_RESERVED_RIDE.START.PROMPT')
                                        .then(function(res) {
                                            if (res == true) {

                                            }
                                            return {};
                                        });
                                }
                            });
                    }],
                    selectedTrip: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                        return "";
                    }],
                    driver: ['$window', 'UsersService', 'SSFTranslateService', 'HistoryService', function($window, UsersService, SSFTranslateService, HistoryService) {
                        return "";
                    }]
                }
            })
            .state('historyRiderResults', {
                url: '/historyRiderResults',
                templateUrl: 'templates/history/historyRiderResults.html',
                controller: 'HistoryRiderCtrl',
                resolve: {
                    previousRides: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                        return "";
                    }],
                    selectedTrip: ['$window', 'PostedTripsService', 'SSFTranslateService', 'HistoryService', function($window, PostedTripsService, SSFTranslateService, HistoryService) {
                        var trip = HistoryService.getTrip();
                        return trip;
                    }],
                    allPastRides: ['$window', 'RideRequestsService', 'SSFTranslateService', function($window, RideRequestsService, SSFTranslateService) {
                        return "";
                    }],
                    driver: ['$window', 'MatchesService', 'SSFTranslateService', 'HistoryService', function($window, MatchesService, SSFTranslateService, HistoryService) {
                        var ride = HistoryService.getTrip();
                        return MatchesService.getDriverInfoByRideId($window.localStorage.token, ride.id)
                            .then(function(response) {
                                if (response.status == 200) {
                                    console.log(response.data);
                                    return response.data;
                                }
                                else {
                                    console.log('Error: System was not able to get driver info');
                                }
                            });
                    }]
                }
            })

        //RATINGS
            .state('driverRating', {
                url: '/driverRating',
                templateUrl: 'templates/ratings/driverRating.html',
                controller: 'DriverRatingCtrl',
                // resolve: {
                //     getDriverInfo: ['RiderTripDetailsService', function(RiderTripDetailsService) {
                //         return RiderTripDetailsService.currentRide();
                //     }]
                // }
            })
            .state('riderRating', {
                url: '/riderRating',
                templateUrl: 'templates/ratings/riderRating.html',
                controller: 'RiderRatingCtrl',
                resolve: {
                    getDriverInfo: ['RiderTripDetailsService', function(RiderTripDetailsService) {
                        return RiderTripDetailsService.currentRide();
                    }]
                }
            })
            
        //RIDER
            .state('rider', {
                url: '/rider',
                templateUrl: 'templates/rider/rider.html',
                controller: 'RiderCtrl',
                cache: false,
                resolve: {
                    translation: ['SSFTranslateService', function(SSFTranslateService) {
                        return SSFTranslateService.translate(["DROPDOWNS.ALL", "DROPDOWNS.NEW", "DROPDOWNS.MATCHED", "DROPDOWNS.PENDING", "DROPDOWNS.RESERVED"])
                            .then(function(response) {
                                return response;
                            });
                    }],
                    getRides: ['RideRequestsService', function(RideRequestsService) {
                        return RideRequestsService.getRideData()
                            .then(function(response) {
                                if (response.status === 200) {
                                    return response.data;
                                }
                                else {
                                    // SSFTranslateService.showAlert('', '')
                                    // $state.go('');
                                }
                                return [];
                            }, function(error) {
                                console.log(error);
                                alert("error");
                            });
                    }]

                }
            })
            .state('riderMatchedRide', {
                url: '/riderMatchedRide',
                templateUrl: 'templates/rider/riderMatchedRide.html',
                controller: 'RiderMatchedRideCtrl',
                resolve: {
                    getMatchedTrips: ['$window', 'MatchesService', 'RiderTripDetailsService', function($window, MatchesService, RiderTripDetailsService) {
                        var currentRide = RiderTripDetailsService.currentRide();
                        console.log(currentRide);
                        return MatchesService.getTripsByRideId(currentRide.id, $window.localStorage.token)
                            .then(function(response) {
                                if (response.status == 200) {
                                    console.log(response.data);
                                    return response.data;
                                }
                                else {
                                    console.log('Error: Was not able to receive data from the PostedTrips Model');
                                }
                            });
                    }]
                }
            })
            .state('riderNewRide', {
                url: 'riderNewRide',
                templateUrl: 'templates/rider/riderNewRide.html',
                controller: 'RiderNewRideCtrl'
            })
            .state('riderPendingRide', {
                url: '/riderPendingRide',
                templateUrl: 'templates/rider/riderPendingRide.html',
                controller: 'RiderPendingRideCtrl',
                resolve:{
                    getDriverInfo: ["MatchesService", "$window", "RiderTripDetailsService", "VehicleService", function(MatchesService, $window, RiderTripDetailsService, VehicleService){
                        console.log("resolve 1");
                        var driverInfo = RiderTripDetailsService.currentRide();
                        console.log("resolve 2");
                        var info = {};
                        var info2 = {};
                         return MatchesService.tripPendDrCommit($window.localStorage.token, driverInfo.Id).then(function(response){
                             info = response.data[0];
                                return info;
                      });
                      
                      /*.then(function(res){
                          RiderTripDetailsService.getRiderData(res);
                            info2 = {info, res};
                            return info2.info;
                      });*/
                      /*.then(function(res){
                          return VehicleService.byId($window.localStorage.token, res.id).then(function(check){
                              info2 = {info, check};
                             return info2;
                          });
                      });
                      */
                       
                    }]
                }
            })
            .state('riderReservedRide', {
                url: '/riderReservedRide',
                templateUrl: 'templates/rider/riderReservedRide.html',
                controller: 'RiderReservedRideCtrl',
                resolve: {
                    getDriverInfo: ["MatchesService", "$window", "TripServices", "VehicleService", "RiderTripDetailsService", function(MatchesService, $window, TripServices, VehicleService, RiderTripDetailsService) {
                        var driverInfo =  RiderTripDetailsService.currentRide();
                        var info = {};
                        //var info2 = {};
                        return MatchesService.riderReservedRide($window.localStorage.token, driverInfo.id).then(function(response) {
                            info = response.data[0];
                            return info;
                           // return VehicleService.byId($window.localStorage.token, info.id);
                        });
                        // .then(function(res) {
                        //   /* info2 = {
                        //         info: info,
                        //         check: res
                        //     };*/
                        //     RiderTripDetailsService.currentRide(info2.info);
                        //     return info2;
                        // });
                    }]
                }
            })
            .state('riderTripDetailsRider', {
                url: '/riderTripDetailsRider',
                templateUrl: 'templates/rider/riderTripDetailsRider.html',
                controller: 'RiderTripDetailsCtrl',
                resolve: {
                  
                }
            })
            .state('riderTripDetailsLobby', {
                url: '/riderTripDetailsLobby',
                templateUrl: 'templates/rider/riderTripDetailsLobby.html',
                controller: 'RiderTripDetailsCtrl',
            })

        //SETTINGS
            .state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings/settings.html',
                controller: 'SettingsCtrl',
                resolve: {
                    translation: ['SSFTranslateService', function(SSFTranslateService) {
                        return SSFTranslateService.translate(["LANGUAGE.FILLER", "LANGUAGE.ENGLISH", "LANGUAGE.SPANISH"])
                            .then(function(response) {
                                return response;
                            });
                    }]
                }
            })
            .state('userProfile', {
                url: '/userProfile',
                templateUrl: 'templates/settings/userProfile.html',
                controller: 'UserProfileCtrl',
                cache: false,
                resolve: {
                    userInfo: ['$window', 'UsersService', 'UserService', 'SSFTranslateService', 'ProfileShareService', function($window, UsersService, UserService, SSFTranslateService, ProfileShareService) {
                        return UsersService.getUserInfo($window.localStorage.userId, $window.localStorage.token)
                                .then(function(response){
                                    if(response.status == 200){
                                        ProfileShareService.userInfo(response.data[0]);
                                        UserService.currentUserInfo(response.data[0]);
                                        console.log(response.data[0]);
                                        return response.data[0];
                                    } else {
                                        console.log("was not able to get user info"+response.status);
                                    }
                                });
                    }],
                    vehicleInfo: ['$window', 'UserService', 'SSFTranslateService', 'VehicleService', 'ProfileShareService', function($window, UserService, SSFTranslateService, VehicleService, ProfileShareService) {
                        return VehicleService.getVehicleDetails($window.localStorage.userId, $window.localStorage.token)
                                .then(function(response){
                                    if(response.status == 200){
                                        ProfileShareService.vehicleInfo(response.data);
                                        return response.data[0];
                                    } else {
                                        console.log('Was Not able to get vehicle info'+response.status);
                                    }
                                });
                    }]
                }
            })
            .state('userProfileSettings', {
                url: '/userProfileSettings',
                templateUrl: 'templates/settings/userProfileSettings.html',
                controller: 'UserProfileSettingsCtrl',
                cache: false,
                resolve: {
                    userInfo: ['$window', 'UsersService', 'ProfileShareService', 'SSFTranslateService', function($window, UsersService, ProfileShareService, SSFTranslateService){
                        return ProfileShareService.userInfo();
                    }],
                    vehicleInfo: ['$window', 'ProfileShareService', 'SSFTranslateService', 'VehicleService', function($window, ProfileShareService, SSFTranslateService, VehicleService){
                        return ProfileShareService.vehicleInfo();
                    }]
                }
            })

        //MISC
            .state('eula', {
                url: '/eula',
                templateUrl: 'templates/eula.html',
                controller: 'EULACtrl'
            })
            .state('landing', {
                url: '/',
                //templateUrl: 'templates/landing.html',
                //controller: 'LandingCtrl'
                templateUrl: 'templates/forms/login.html',
                controller: 'LoginCtrl'
            })
            .state('lobby', {
                url: '/lobby',
                templateUrl: 'templates/lobby.html',
                controller: 'LobbyCtrl',
                cache: false
            })

        .state('navigation', {
                url: '/navigation',
                template: '<ion-view hide-nav-bar="false" title="Navigation">' +
                    '<ion-nav-buttons></ion-nav-buttons>' +
                    '<ion-content class="padding has-footer">' +
                    '<button class="button button-block button-calm ssf-button" ng-repeat="nav in navLinks" ui-sref="{{nav}}">{{nav}}</button>' +
                    '</ion-content>' +
                    '</ion-view>',
                controller: function($state, $scope) {
                    var stateArray = $state.get();
                    $scope.navLinks = [];
                    for (var i in stateArray) {
                        if (stateArray[i].name !== '' && stateArray[i].name !== 'navigation' && stateArray[i].name !== 'update') {
                            $scope.navLinks.push(stateArray[i].name);
                        }
                        else {

                        }
                    }

                }
            })
            .state('wizardActivity', {
                url: '/wizardActivity',
                templateUrl: 'templates/wizardActivity.html',
                controller: 'WizardActivityCtrl',
                resolve: {
                    locationBlocked: ['ActivityService', function(ActivityService) {
                        return ActivityService.locationBlocked()
                            .then(function(response) {
                                return response.data;
                            });
                    }]
                }
            });
    }
]);