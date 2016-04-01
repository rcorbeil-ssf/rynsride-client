angular.module('starter.controllers')
.controller('UserProfileCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', '$ionicPopover', 'userInfo', 'vehicleInfo',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate, $ionicPopover, userInfo, vehicleInfo) {
                /* TO-DO: 
                        need a way to get the user profile info of the profile click. needs to be included in
                        the ng-click on the HTML of the page that displays the "profile link". Could be a photo,
                        Name, Car, etc.
                        We also need to perform a GET request to both the User Model, Preferences Model, Rating Model, Vehicle Model.
                        Need to set $scope.userInfo.User = response.data; (of the User Model GET Method).
                        Need to set $scope.userInfo.Preferences = response.data; (of the Preferences Model GET Method).
                */
                // master object is used to clear the form.
                $scope.master = {};
                
                // vvv userInfo object is what is downloaded from Backend.
                // $scope.user={};
                $scope.user = userInfo;
                $scope.userVehicle = vehicleInfo;
               
                $scope.findGender = function() {
                        
                        if ($scope.user.gender == true) {
                                return 'USER_PROFILE.GENDER_MALE';
                        } else if ($scope.user.gender == false) {
                                return 'USER_PROFILE.GENDER_FEMALE';
                        } else if ($scope.user.gender == null) {
                                return "";
                        }
                };
                $ionicPopover.fromTemplateUrl('templates/popups/contactUser.html', {
                    scope: $scope
                  }).then(function(popover) {
                    $scope.popover = popover;
                  });
                $scope.openPopover = function($event) {
                  $scope.popover.show($event);
                };
                $scope.closePopover = function() {
                  $scope.popover.hide();
                };
                $scope.placeholderFinder = function (object, property){
                        if ($scope[object][property] == "" || $scope[object][property] == null){
                                return "";
                        } else {
                               return $scope[object][property]; 
                        } 
                };
                $scope.updateProfile = function(form){
                        // $scope.userInfo1 = $scope.userInfo;
                        $state.go("userProfile");
                        $scope.user = angular.copy(form);
                        console.log($scope.user);
                        //$scope.reset();
                        
                };
                $scope.reset = function() {
                        $scope.user = angular.copy($scope.master);
                };
                // vvvv this is used for the rating system on this page.
                // is pulling rating from the downloaded object.
                $scope.rating = {};
                $scope.readOnly = true;
                $scope.rating.rate = $scope.user.avgRating;
                $scope.rating.max = 5;
                
                // vvvvv Rachel & Ryan's function for tabs.
                 this.onTabSelected = function(_scope){
  
                    // if we are selectng the profile title then 
                    // change the state back to the top state
                    if ( _scope.title === 'User Profile') {
                      setTimeout(function() {
                        $state.go('tab.userProfile', {});
                      },20);
                    }
                };
}]);
