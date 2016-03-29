angular.module('starter.controllers')

.controller('UserProfileCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk', '$translate',
    'ionicMaterialMotion', '$ionicNavBarDelegate',
    function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate) {


        var userInfo = [];
        $scope.findGender = function() {

            if (userInfo.gender == true) {
                return "{{USER_PROFILE.GENDER_MALE}}";
            }
            else if (userInfo.gender == false) {
                return "{{USER_PROFILE.GENDER_FEMALE}}";
            }
            else if (userInfo.gender == null) {
                return "";
            }
        };
    }
]);