// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.rating', 'starter.controllers',
    'ionic-material', 'pascalprecht.translate', 'SSFConfig', 'SSFAlerts', 'SSFCache',
    'SSFConnectivity', 'SSFCss', 'SSFDirectives', 'SSFFavorites', 'SSFLogout',
    'SSFMailComposer', 'SSFSpinner', 'SSFTranslate', 'RESTServices', 'starter.services',
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
                StatusBar.styleDefault();
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
                    getRiderDetails: ['RiderTripDetailsService', function(RiderTripDetailsService) {
                        return RiderTripDetailsService.getRiderData();
                    }]
                }
            })
            .state('driverReservedRide', {
                url: '/driverReservedRide',
                templateUrl: 'templates/driver/driverReservedRide.html',
                controller: 'DriverReservedRideCtrl',
                resolve: {
                    committedRiders: ['$window', 'MatchesService', 'SSFTranslateService', function($window, MatchesService, SSFTranslateService) {
                        // need to communicate with Driver page to be able to pass through the trip object so we can do the "getRidersByTripId"
                        // function.
                        return MatchesService.getRidersByTripId(2, $window.localStorage.token)
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
                        }
                    )}]
                }
            })
            .state('driverTripDetails', {
                url: '/driver-trip-details',
                templateUrl: 'templates/driver/driverTripDetails.html',
                controller: 'DriverTripDetailsCtrl',
                resolve:{
                    riders:["TripServices", "MatchesService", "$window",
                    function(TripServices, MatchesService, $window){
                    // riders: [function() {MatchesService
                        var trip = TripServices.currentTrip();
                        return MatchesService.tripPendDrCommit($window.localStorage.token, trip.id)
                        .then(function(res) {
                            console.log(res);
                            return res;
                        },function(err) {
                            console.error('Failed.', err);
                            return err;
                        });
                        
                        // if(trip.state === "new"){
                        //     return [];
                        // }else{
                        //     return []; //TODO: connect an actual api
                        // }
                    }]
                    
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
                controller: 'PostTripCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/forms/register.html',
                controller: 'RegisterCtrl'
            })
            .state('requestRide', {
                url: '/requestRide',
                templateUrl: 'templates/forms/requestRide.html',
                controller: 'RequestRideCtrl'
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
                    previousRiders: ['$window', 'PostedTripsService', 'SSFTranslateService', 'HistoryService', function($window, PostedTripsService, SSFTranslateService, HistoryService) {
                        var trip = HistoryService.getTrip(); // = to service that shares the "trip with Resolve"
                        return PostedTripsService.getRidersByTripId(trip.tripId, 'completed', $window.localStorage.token)
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
                        var currentDate = new Date().toUTCString();
                        return RideRequestsService.getTripHistory($window.localStorage.userId, currentDate, $window.localStorage.token)
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
                    driver: ['$window', 'UsersService', 'SSFTranslateService', 'HistoryService', function($window, UsersService, SSFTranslateService, HistoryService) {
                        var ride = HistoryService.getTrip();
                        return UsersService.getUserInfo(ride.rideId, $window.localStorage.token)
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
                resolve: {
                    getRiderData: ['GetRiderInfoService', function(GetRiderInfoService) {
                        return GetRiderInfoService.getRiderInfo()
                            .then(function(response) {
                                console.log(response);
                                if (response.status === 200) {
                                    return response.data;
                                }
                                else {
                                    //SSFTranslateService.showAlert('', '')
                                    // $state.go('');
                                }
                                return {};
                                // }, function(error) {
                                //   console.log(error);
                                //   alert("error");
                            });
                    }],
                    
                }
            })
            .state('riderRating', {
                url: '/riderRating',
                templateUrl: 'templates/ratings/riderRating.html',
                controller: 'RiderRatingCtrl',
                resolve: {
                    getDriverData: ['GetDriverInfoService', function(GetDriverInfoService) {
                        return GetDriverInfoService.getDriverInfo()
                            .then(function(response) {
                                if (response.status === 200) {
                                    return response.data;
                                }
                                else {
                                    //SSFTranslateService.showAlert('', '')
                                    // $state.go('');
                                }
                                return {};
                            });


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
                     getMatchedTrips: ['$window', 'MatchesService', 'MatchedService', function($window, MatchesService, MatchedService) {
                         var riderId = MatchedService.getRiderId();
                         console.log(riderId);
                         return MatchesService.getTripsByRiderId(riderId, $window.localStorage.token)
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
                resolve: {
                    getDriverData: ['GetDriverInfoService', function(GetDriverInfoService) {
                        return GetDriverInfoService.getDriverInfo( /*Driver ID*/ ) //TODO: obtain driver ID from Service <-------
                            .then(function(response) {
                                if (response.status === 200) {
                                    return response.data;
                                }
                                else {
                                    //SSFTranslateService.showAlert('', '')
                                    // $state.go('');
                                }
                                return {};
                            }, function(error) {
                                console.log(error);
                                alert("error");
                            });
                    }],
                    getTripInformation: ['ActivityService', function(ActivityService) {
                        return ActivityService.getActivityInfoOne( /*Driver ID*/ )
                            .then(function(response) {
                                if (response.status === 200) {
                                    return response.data;
                                }
                                else {
                                    //SSFTranslateService.showAlert('', '')
                                    // $state.go('');
                                }
                                return {};
                            }, function(error) {
                                console.log(error);
                                alert("error");
                            });
                    }]
                }
            })
            .state('riderReservedRide', {
                url: '/riderReservedRide',
                templateUrl: 'templates/rider/riderReservedRide.html',
                controller: 'RiderReservedRideCtrl',
                resolve: {
                    getDriverData: ['GetDriverInfoService', function(GetDriverInfoService) {
                        return GetDriverInfoService.getDriverInfo( /*Driver ID*/ ) //TODO: obtain driver ID from Service <-------
                            .then(function(response) {
                                if (response.status === 200) {
                                    return response.data;
                                }
                                else {
                                    //SSFTranslateService.showAlert('', '')
                                    // $state.go('');
                                }
                                return {};
                            }, function(error) {
                                console.log(error);
                                alert("error");
                            });
                    }],
                    getTripInformation: ['ActivityService', function(ActivityService) {
                        return ActivityService.getActivityInfoOne( /*Driver ID*/ )
                            .then(function(response) {
                                if (response.status === 200) {
                                    return response.data;
                                }
                                else {
                                    //SSFTranslateService.showAlert('', '')
                                    // $state.go('');
                                }
                                return {};
                            }, function(error) {
                                console.log(error);
                                alert("error");
                            });
                    }]
                }

            })
            .state('riderTripDetails-Rider', {
                url: '/riderTripDetailsRider',
                templateUrl: 'templates/rider/riderTripDetails-Rider.html',
                controller: 'RiderTripDetailsCtrl',
                resolve: {
                    vehicleDetails: ["VehicleService", '$state', 'SSFAlertsService', function(VehicleService, $state, SSFAlertsService) {
                        return VehicleService.byId()
                            .then(function(res) {
                                if (res.status === 200) {
                                    return res.data;
                                }
                                return SSFAlertsService.showConfirm('Error', 'We were unable to get the vehicle preferences. Would you like to try again?')
                                    .then(function(res) {
                                        if (res === true) {
                                            $state.go('riderTripDetails', {}, {reload: true});
                                        }
                                        else {
                                            $state.go('rider');
                                        }
                                    });
                            });
                    }]
                }
            })
            .state('riderTripDetails-Lobby', {
                url: '/riderTripDetailsLobby',
                templateUrl: 'templates/rider/riderTripDetails-Lobby.html',
                controller: 'RiderTripDetailsCtrl',
                resolve: {
                    vehicleDetails: ["VehicleService", '$state', 'SSFAlertsService', function(VehicleService, $state, SSFAlertsService) {
                        return VehicleService.byId()
                            .then(function(res) {
                                if (res.status === 200) {
                                    return res.data;
                                }
                                return SSFAlertsService.showConfirm('Error', 'We were unable to get the vehicle preferences. Would you like to try again?')
                                    .then(function(res) {
                                        if (res === true) {
                                            $state.go('riderTripDetails', {}, {reload: true});
                                        }
                                        else {
                                            $state.go('lobby');
                                        }
                                    });
                            });
                    }]
                }
            })

        //SETTINGS
            .state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings/settings.html',
                controller: 'SettingsCtrl',
                resolve: {
                    translation: ['SSFTranslateService', function(SSFTranslateService, $scope) {
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
                resolve: {
                    userInfo: ['$window', 'UsersService', 'SSFTranslateService', function($window, UsersService, SSFTranslateService) {
                        return UsersService.getUserInfo($window.localStorage.userId, $window.localStorage.token)
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
                    }]
                }
            })
            .state('userProfileSettings', {
                url: '/userProfileSettings',
                templateUrl: 'templates/settings/userProfileSettings.html',
                controller: 'UserProfileSettingsCtrl'
            })

        //MISC
            .state('eula', {
                url: '/eula',
                templateUrl: 'templates/eula.html',
                controller: 'EULACtrl'
            })
            .state('landing', {
                url: '/',
                templateUrl: 'templates/landing.html',
                controller: 'LandingCtrl'
            })
            .state('lobby', {
                url: '/lobby',
                templateUrl: 'templates/lobby.html',
                controller: 'LobbyCtrl',
                resolve: {
                    tripDetails: ["PostedTripsService", function(PostedTripsService) {
                        return PostedTripsService.getLocalTrips()
                            .then(function(res) {
                                if (res.status === 200) {
                                    return res.data;
                                }
                                alert('There was an error.');
                                return {};
                            });
                    }]
                }
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
            })
    }
]);