angular.module('starter.controllers')
    .controller('DriverRatingCtrl', ['$scope', '$http', '$state', '$window', '$ionicHistory',
        '$translate', '$rootScope', '$q', 'UsersService', 'SSFTranslateService', 'SSFConfigConstants',
        '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion',
        function($scope, $http, $state, $window, $ionicHistory, $translate, $rootScope,
            $q, UsersService, SSFTranslateService, SSFConfigConstants, $timeout, ionicMaterialInk,
            ionicMaterialMotion) {


            $scope.rating = 4;
            $scope.data = {
                rating: 1,
                max: 20
            };

            $scope.$watch('data.rating', function() {
                console.log('New value: ' + $scope.data.rating);
            });
            
            

            //sets current user's information **make sure this function mirrors the LoginCtrl function**
            function setLocalStorage(data) {
                $window.localStorage['rememberMe'] = $scope.checkbox.rememberMe;
                $window.localStorage['userId'] = data.userId;
                $window.localStorage['token'] = data.id;
                if ($scope.checkbox.rememberMe) {
                    $window.localStorage["email"] = $scope.registerData.email;
                }
                else {
                    delete $window.localStorage["email"];
                }
                $scope.registerData = {
                    'hasAcceptedEULA': false
                };
                setProgress();
            }

            function setProgress() {
                // return UsersService.updateUser($window.localStorage.token, $window.localStorage.userId, {})
                // .then(function(response){
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                return $state.go('lobby');
                // });
            }

            function retryRegister(form) {
                return SSFTranslateService.showConfirm("ERROR.TITLE", "ERROR.SOME_RETRY_ERROR")
                    .then(function(res) {
                        if (res)
                            $scope.submitRegisterForm(form);
                    });
            }


            $timeout(function() {
                ionicMaterialInk.displayEffect();
                ionicMaterialMotion.ripple();
            }, 0);

            $scope.registerData = {
                'hasAcceptedEULA': false
            };

            $scope.checkbox = {};
            $scope.$on('$ionicView.enter', function() {
                // Code you want executed every time view is opened
                if ($window.localStorage.rememberMe === undefined || $window.localStorage.rememberMe === 'true') {
                    $scope.checkbox.rememberMe = true;
                }
                else {
                    $scope.checkbox.rememberMe = false;
                }
                $rootScope.stopSpinner = true;
                UsersService.getIP()
                    .then(function(response) {
                        $scope.registerData.regIP = response.data;
                        $scope.registerData.logIP = response.data;
                    });
            });
            $scope.repeatPassword = {};

            $scope.submitRegisterForm = function(form) {
                if (form.password.$invalid)
                    return SSFTranslateService.showAlert("ERROR.TITLE", "FORMS.POPOVERS.1");
                if (!$scope.registerData.hasAcceptedEULA)
                    return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.ACCEPT_EULA");
                if ($scope.repeatPassword.password !== $scope.registerData.password)
                    return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.PASSWORDS_UNMATCHED");
                if (form.$invalid)
                    return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
                prepData();
                UsersService.create($scope.registerData)
                    .then(function(response) {
                        if (response.status === 204)
                            return SSFTranslateService.showAlert('ERROR.TITLE', 'ERROR.EMAIL_TAKEN');
                        if (response.status !== 200)
                            return SSFTranslateService.showAlert('ERROR.TITLE', 'ERROR.SOME_RETRY_ERROR');
                        // $ionicAnalytics.setGlobalProperties({
                        //     ZibID: response.data.userId
                        // });
                        setLocalStorage(response.data);
                    }, function(err) {
                        if (err.status === 204)
                            return SSFTranslateService.showAlert('ERROR.TITLE', 'ERROR.EMAIL_TAKEN');
                        retryRegister(form);
                    });
            };

            $scope.showPopup = function($event, body) {
                return SSFTranslateService.showPopup($scope, $event, body);
            };

            $scope.clickedRememberMe = function() {
                $window.localStorage['rememberMe'] = $scope.checkbox.rememberMe;
            };

            $scope.navEula = function() {
                if ($window.cordova && cordova.InAppBrowser) {
                    cordova.InAppBrowser.open(SSFConfigConstants.eulaUrl, '_blank', 'location=no,hardwareback=no');
                }
                else {
                    $window.open(SSFConfigConstants.eulaUrl);
                }
            };
        }
    ]);
    
    // Generated by CoffeeScript 1.9.1
(function() {
  angular.module('ionic.rating', []).constant('ratingConfig', {
    max: 5,
    stateOn: null,
    stateOff: null
  }).controller('RatingController', function($scope, $attrs, ratingConfig) {
    var ngModelCtrl;
    ngModelCtrl = {
      $setViewValue: angular.noop
    };
    this.init = function(ngModelCtrl_) {
      var max, ratingStates;
      ngModelCtrl = ngModelCtrl_;
      ngModelCtrl.$render = this.render;
      this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
      this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
      max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
      ratingStates = angular.isDefined($attrs.ratingStates) ? $scope.$parent.$eval($attrs.ratingStates) : new Array(max);
      return $scope.range = this.buildTemplateObjects(ratingStates);
    };
    this.buildTemplateObjects = function(states) {
      var i, j, len, ref;
      ref = states.length;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        states[i] = angular.extend({
          index: 1
        }, {
          stateOn: this.stateOn,
          stateOff: this.stateOff
        }, states[i]);
      }
      return states;
    };
    $scope.rate = function(value) {
      if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
        ngModelCtrl.$setViewValue(value);
        return ngModelCtrl.$render();
      }
    };
    $scope.reset = function() {
      $scope.value = ngModelCtrl.$viewValue;
      return $scope.onLeave();
    };
    $scope.enter = function(value) {
      if (!$scope.readonly) {
        $scope.value = value;
      }
      return $scope.onHover({
        value: value
      });
    };
    $scope.onKeydown = function(evt) {
      if (/(37|38|39|40)/.test(evt.which)) {
        evt.preventDefault();
        evt.stopPropagation();
        return $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? {
          1: -1
        } : void 0));
      }
    };
    this.render = function() {
      return $scope.value = ngModelCtrl.$viewValue;
    };
    return this;
  }).directive('rating', function() {
    return {
      restrict: 'EA',
      require: ['rating', 'ngModel'],
      scope: {
        readonly: '=?',
        onHover: '&',
        onLeave: '&'
      },
      controller: 'RatingController',
      template: '<ul class="rating" ng-mouseleave="reset()" ng-keydown="onKeydown($event)">' + '<li ng-repeat="r in range track by $index" ng-click="rate($index + 1)"><i class="icon" ng-class="$index < value && (r.stateOn || \'ion-ios-star\') || (r.stateOff || \'ion-ios-star-outline\')"></i></li>' + '</ul>',
      replace: true,
      link: function(scope, element, attrs, ctrls) {
        var ngModelCtrl, ratingCtrl;
        ratingCtrl = ctrls[0];
        ngModelCtrl = ctrls[1];
        if (ngModelCtrl) {
          return ratingCtrl.init(ngModelCtrl);
        }
      }
    };
  });

}).call(this);


