// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.rating', 'starter.controllers',
  'ionic-material', 'pascalprecht.translate', 'SSFConfig', 'SSFAlerts', 'SSFCache',
  'SSFConnectivity', 'SSFCss', 'SSFDirectives', 'SSFFavorites', 'SSFLogout',
  'SSFMailComposer', 'SSFSpinner', 'SSFTranslate', 'RESTServices', 'starter.services'
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

    $rootScope.showFooter = false;
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            $rootScope.showFooter =
                toState.url === '/' ||
                toState.url === '/login' ||
                toState.url === '/register';
        }
    );

}])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('landing', {
            url: '/',
            templateUrl: 'templates/landing.html',
            controller: 'LandingCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/forms/login.html',
            controller: 'LoginCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/forms/register.html',
            controller: 'RegisterCtrl'
        })
        .state('lobby', {
            url: '/lobby',
            templateUrl: 'templates/lobby.html',
            controller: 'LobbyCtrl'
        })
        .state('wizardActivity', {
            url: '/wizard-activity',
            templateUrl: 'templates/wizardActivity.html',
            controller: 'WizardActivityCtrl',
            // resolve:{
            //   translation: ['SSFTranslateService', function(SSFTranslateService, $scope){
            //     return SSFTranslateService.translate(["WIZARD_ACTIVITY.SIGN_IN", "WIZARD_ACTIVITY.CLICK_BELOW", "WIZARD_ACTIVITY.GET_STARTED"])
            //       .then( function(response){
            //         return response;

            //       });
            //   }]
            // }
        })
        .state('userProfile', {
            url: '/user-profile',
            templateUrl: 'templates/userProfile.html',
            controller: 'UserProfileCtrl',
            resolve: {
                userInfo: ['$window', 'UsersService', 'SSFTranslateService', function($window, UsersService, SSFTranslateService) {
                  return UsersService.getUserInfo(123, $window.localStorage.token)
                    .then(function(res) {
                      if (res.status == 200) {
                        console.log(res);
                        return res.data;
                      } else {
    
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
                      }});
                }
            ]}
        })
        .state('userProfileSettings', {
            url: '/user-profile-settings',
            templateUrl: 'templates/userProfileSettings.html',
            controller: 'UserProfileSettingsCtrl'
        })
        .state('riderMatchedRide', {
            url: '/riderMatchedRide',
            templateUrl: 'templates/riderMatchedRide.html',
            controller: 'RiderMatchedRideCtrl',
            resolve: {
              getMatchedTrips: ['$window', 'MatchesService', 'MatchedService', function($window, MatchesService, MatchedService) {
                var riderId = MatchedService.getRiderId();
                console.log(riderId);
                return MatchesService.getTripDetails(riderId, $window.localStorage.token)
                        .then(function(response){
                          if (response.status == 200) {
                            console.log(response.data);
                            return response.data;
                          } else {
                            console.log ('Error: Was not able to receive data from the PostedTrips Model');
                          }
                        });
              }]
            }
        })
        .state('driverReservedRide', {
          url: '/driverReservedRide',
          cache: false,
          templateUrl: 'templates/driverReservedRide.html',
          controller: 'DriverReservedRideCtrl',
          resolve: {
            committedRiders: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
              return PostedTripsService.getRidersByTripId(1251, $window.localStorage.token)
                .then(function(res) {
                  if (res.status == 200) {
                    console.log(res);
                    return res.data;
                  } else {

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
                  }});
            }]}
        })
        .state('driverTripDetails', {
            url: '/driver-trip-details',
            templateUrl: 'templates/driverTripDetails.html',
            controller: 'DriverTripDetailsCtrl'
        })
        .state('eula', {
            url: '/eula',
            templateUrl: 'templates/eula.html',
            controller: 'EULACtrl'
        })
        .state('rider', {
            url: '/rider',
            templateUrl: 'templates/rider.html',
            controller: 'RiderCtrl',
            resolve: {
                translation: ['SSFTranslateService', function(SSFTranslateService) {
                    return SSFTranslateService.translate(["RIDER_PAGE_CTRL.ALL", "RIDER_PAGE_CTRL.NEW", "RIDER_PAGE_CTRL.MATCHED", "RIDER_PAGE_CTRL.PENDING", "RIDER_PAGE_CTRL.RESERVED"])
                        .then(function(response) {
                            return response;
                        });
                }]
            }
        })
        .state('riderTripDetails', {
            url: '/riderTripDetails',
            templateUrl: 'templates/forms/riderTripDetails.html',
            controller: 'RiderTripDetailsCtrl'
        })
        .state('postTrip', {
            url: '/postTrip',
            templateUrl: 'templates/forms/postTrip.html',
            controller: 'PostTripCtrl'
        })
        .state('requestRide', {
            url: '/requestRide',
            templateUrl: 'templates/forms/requestRide.html',
            controller: 'RequestRideCtrl'
        })
        .state('driverPendingTrip', {
            url: '/driverPendingTrip',
            templateUrl: 'templates/driverPendingTrip.html',
            controller: 'DriverPendingTripCtrl'
        })
        .state('driver', {
            url: '/driver',
            templateUrl: 'templates/driver.html',
            controller: 'DriverCtrl',
            resolve: {
                translation: ['SSFTranslateService', function(SSFTranslateService, $scope) {
                    return SSFTranslateService.translate(["DROPDOWNS.ALL", "DROPDOWNS.NEW", "DROPDOWNS.PENDING", "DROPDOWNS.RESERVED"])
                        .then(function(response) {
                            return response;

                        });
                }]
            }
        })
        .state('driverRating', {
            url: '/driverRating',
            templateUrl: 'templates/forms/driverRating.html',
            controller: 'DriverRatingCtrl'
        })
        .state('riderRating', {
            url: '/riderRating',
            templateUrl: 'templates/forms/riderRating.html',
            controller: 'RiderRatingCtrl'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'templates/settings.html',
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
        .state('riderPendingRide', {
            url: '/riderPendingRide',
            templateUrl: 'templates/riderPendingRide.html',
            controller: 'RiderPendingRideCtrl'
        })
        .state('riderReservedRide', {
            url: '/riderReservedRide',
            templateUrl: 'templates/riderReservedRide.html',
            controller: 'RiderReservedRideCtrl'
        })
        .state('historyDriver', {
            url: '/historyDriver',
            templateUrl: 'templates/historyDriver.html',
            controller: 'HistoryDriverCtrl',
            resolve: {
                previousTrips: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                  return PostedTripsService.getDriverHistory(122, 'completed', $window.localStorage.token)
                    .then(function(res) {
                      if (res.status == 200) {
                        console.log(res);
                        return res.data;
                      } else {
    
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
                      }});
                }],
                previousRiders: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                  return "";
                }],
                selectedTrip: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                  return "";
                }]
            }
        })
        .state('historyRider', {
            url: '/historyRider',
            templateUrl: 'templates/historyRider.html',
            controller: 'HistoryRiderCtrl',
            resolve: {
                previousRides: ['$window', 'PostedTripsService', 'SSFTranslateService', function ($window, PostedTripsService, SSFTranslateService) {
                  return PostedTripsService.getRiderHistory(1, 'completed', $window.localStorage.token)
                    .then(function(res) {
                      if (res.status == 200) {
                        console.log(res);
                        return res.data;
                      } else {
    
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
                      }});
                }],
                selectedTrip: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                  return "";
                }],
                driver: ['$window', 'UsersService', 'SSFTranslateService', 'HistoryService', function($window, UsersService, SSFTranslateService, HistoryService){
                    return "";
                }]
        }})
        .state('historyDriverResults',{
          url: '/historyDriverResults',
          templateUrl: 'templates/historyDriverResults.html',
          controller: 'HistoryDriverCtrl',
          resolve: {
                previousTrips: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                  return "";
                }],
                previousRiders: ['$window', 'PostedTripsService', 'SSFTranslateService', 'HistoryService', function($window, PostedTripsService, SSFTranslateService, HistoryService) {
                    var trip = HistoryService.getTrip(); // = to service that shares the "trip with Resolve"
                    return PostedTripsService.getRidersByTripId(trip.tripId, 'completed', $window.localStorage.token)
                     .then(function(res){
                         if (res.status == 200){
                             console.log(res.data);
                             return res.data;
                         } else {
                             console.log('Error');
                         }
                     })}],
                selectedTrip: ['$window', 'PostedTripsService', 'SSFTranslateService', 'HistoryService', function($window, PostedTripsService, SSFTranslateService, HistoryService){
                    var trip = HistoryService.getTrip();
                    return trip;
                }]
          }
        })
        .state('historyRiderResults', {
          url: '/historyRiderResults',
          templateUrl: 'templates/historyRiderResults.html',
          controller: 'HistoryRiderCtrl',
          resolve: {
                previousRides: ['$window', 'PostedTripsService', 'SSFTranslateService', function($window, PostedTripsService, SSFTranslateService) {
                  return "";
                }],
                selectedTrip: ['$window', 'PostedTripsService', 'SSFTranslateService', 'HistoryService', function($window, PostedTripsService, SSFTranslateService, HistoryService){
                    var trip = HistoryService.getTrip();
                    return trip;
                }],
                driver: ['$window', 'UsersService', 'SSFTranslateService', 'HistoryService', function($window, UsersService, SSFTranslateService, HistoryService){
                    var ride = HistoryService.getTrip();
                    return UsersService.getDriverInfo(ride.Id, $window.localStorage.token)
                            .then(function(response){
                              if (response.status == 200) {
                                console.log(response.data);
                                return response.data;
                              } else {
                                console.log('Error: System was not able to get driver info');
                              }
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
                }
                $scope.navLinks.sort();
            }
        })
        ;
}])
;