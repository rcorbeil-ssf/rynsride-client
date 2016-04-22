angular.module('starter.controllers')

.controller('UserProfileSettingsCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk',
        'ionicMaterialMotion', '$translate', 'UserService', '$window', 'UpdatePhoto', 'UpdateVehicle', 'UsersService', 'VehicleService', 'vehicleInfo', 'userInfo', '$ionicModal', 'SSFTranslateService',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $translate, 
                UserService, $window, UpdatePhoto, UpdateVehicle, UsersService, VehicleService, vehicleInfo, userInfo, $ionicModal, SSFTranslateService) {
                $scope.photoFile;
                $scope.vehiclePhotoFile;
                $scope.user={};
                $scope.userVehicle={};
                $scope.displayUser = userInfo;
                $scope.displayVehicle = vehicleInfo[0];
                
                $scope.placeholderFinder = function (object, property){
                        if ($scope[object][property] == ""){
                                return "";
                        } else {
                               return $scope[object][property]; 
                        } 
                };
                $scope.updateProfile = function (form){
                                
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
                        if ($scope.vehiclePhotoFile){
                          UpdateVehicle.uploadPhoto($scope.vehiclePhotoFile, $window.localStorage.userId, $window.localStorage.token)
                          .then(function(err, result){
                            if (err){
                              if (err.status === 200){
                                
                              }
                              console.log(err);
                            }else{
                              console.log(result);
                            }
                          });
                        }
                                
                        // now update the rest of the profile        
                        UsersService.updateUser($window.localStorage.userId, $window.localStorage.token, $scope.user);
                        if(vehicleInfo.length === 0){
                          $scope.userVehicle.userId = $window.localStorage.userId;
                          VehicleService.create($scope.userVehicle);
                        } else {
                          $scope.userVehicle.userId = $window.localStorage.userId;
                          console.log($scope.displayVehicle);
                          VehicleService.updateVehicleDetailsById($scope.displayVehicle.id, $window.localStorage.token, $scope.userVehicle); 
                        }
                        
                        $scope.user={};
                        $scope.userVehicle={};
                        return $state.go('userProfile', {}, {reload: true});
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
                      };
                      reader.readAsDataURL(input.files[0]);
                    } else {
                      preview.setAttribute('src', 'placeholder.png');
                    }
                };
                $scope.previewVehicleImage = function(input) {
                    var preview = document.getElementById('vehiclePreview');
                    if (input.files && input.files[0]) {
                      $scope.userVehicle.photo = input.files[0].name;
                      // remember that we've updated the photo for when we update to the backend
                      $scope.vehiclePhotoFile = input.files[0];
                      console.log($scope.userVehicle.photo);
                      var reader = new FileReader();
                      reader.onload = function (e) {
                        preview.setAttribute('src', e.target.result);
                      };
                      reader.readAsDataURL(input.files[0]);
                    } else {
                      preview.setAttribute('src', 'placeholder.png');
                    }
                };
                $ionicModal.fromTemplateUrl('address.html', function($ionicModal){ 
                  $scope.startModal = $ionicModal;
                }, {
                  scope: $scope,
                  animation: 'slide-in-up'
                });
                $scope.insertAddress = function(form) {
                    if (form.$invalid) {
                        return SSFTranslateService.showAlert("ERROR.TITLE", "ERROR.INCOMPLETE_FORM");
                    }
                    else {
                        $scope.startModal.hide();
                    }
                };
}]);

