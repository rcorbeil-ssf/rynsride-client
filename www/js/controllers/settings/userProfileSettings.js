angular.module('starter.controllers')
.controller('UserProfileSettingsCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$translate', 'UserService',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $translate, UserService) {
                $scope.userEdit;
                $scope.vehicleEdit;
                $scope.user = UserService.currentUserInfo();
                $scope.userVehicle = UserService.currentVehicleInfo();
                
                $scope.placeholderFinder = function (object, property){
                        if ($scope[object][property] == ""){
                                return "";
                        } else {
                               return $scope[object][property]; 
                        } 
                };
                $scope.updateProfile = function (form){
                        $scope.userEdit = $scope.user;
                        $scope.vehicleEdit = $scope.userVehicle;
                        UserService.updateProfile($scope.userEdit, $scope.vehicleEdit);
                        $state.go('userProfile');
                };
}]);
