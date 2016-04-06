angular.module('starter.controllers')

.controller('UserProfileSettingsCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$translate', 'UserService', '$window', 'UpdatePhoto',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $translate, 
                UserService, $window, UpdatePhoto) {
                $scope.photoFile;
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
                        
                // send the photo image to the backend
                if($scope.photoFile) {
                  UpdatePhoto.uploadPhoto($scope.photoFile, $window.localStorage.userId, $window.localStorage.token)
                  .then(function(err,result){
                        if(err) {
                          if(err.status === 200){
                            //all good
                          }
                          console.log(err);
                        }else{
                          console.log(result);
                        }
                  });
                }                       
                        
                // now update the rest of the profile        
                UserService.updateProfile($scope.userEdit, $scope.vehicleEdit);
                $state.go('userProfile');
                };
                
                // Previews the uploaded photo BEFORE it gets sent to the backend 
                $scope.previewImage = function(input) {
                    var preview = document.getElementById('preview');
                    if (input.files && input.files[0]) {
                      $scope.user.photo = input.files[0].name;
                      // remember that we've updated the photo for when we update to the backend
                      $scope.photoFile = input.files[0];
                      console.log($scope.user.photo);
                      var reader = new FileReader();
                      reader.onload = function (e) {
                        preview.setAttribute('src', e.target.result);
                      }
                      reader.readAsDataURL(input.files[0]);
                    } else {
                      preview.setAttribute('src', 'placeholder.png');
                    }
                }
}]);

