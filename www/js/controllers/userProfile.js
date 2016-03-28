angular.module('starter.controllers')
.controller('UserProfileCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$ionicNavBarDelegate', '$translate', '$ionicPopover',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate, $ionicPopover) {
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
                $scope.user = {
                                "firstName": "Leif", // <---- changed property name from "name" to "firstName".
                                "lastName": "", // <---- added property of "lastName" please remind to person making models.
                            	"address": "3000 University Ave, San Diego, CA 92104", 	//(JSON object) (encrypted)
                            	"email": "leif@leif.com",	//(encrypted)
                            	"cellPhone": "909-210-5356",	//(encrypted)
                            	"photo": "http://www.liveyachting.com/wp-content/uploads/2010/03/IMG_7130_SML.jpg",
                            	"gender": true,	//(encrypted)
                            	"age": 21,		//(encrypted)
                            	"facebookLoginAccount": "", 
			        "language": "en"
                };
                $scope.userPreferences = {
                                "userID": "123",
                            	"sameSexOnly": false,
                            	"ageRange": "18-30",
                            	"likesDogs": true,
                		"needBikeRack": false,
                		"needWheelchair": false

                };
                $scope.userRating = {
                    	"raterID": "123", //(userId)
                    	"rateeID": "22",//(userId)
                    	"tripID": "55",
                    	"rate": 4.5 // <---- using this "userRating" property as a fill in for what the model will have in the future
                    	            //            need to find some way of displaying html stars depending on what this number is.
                    	            //            displaying a number would be easier.
                };
                $scope.userVehicle = {
                            	"userID": "",
                            	"year": 2010,
                            	"make": "",
                            	"model": "",
                            	"color": "",
                            	"licensePlate": "", //(encrypt)
                            	"bikeRack": "",
                            	"wheelchairAccessible": "",
			        "photo": "http://1.cdn.fisherkia.inspirelightning.com/wp-content/uploads/2014/12/Caribbean-Blue-Kia-Soul-1.jpg"
                };
                /* $scope.userInfo = {
                        "user": {
                                "firstName": $scope.userInfo1.user.firstName, // <---- changed property name from "name" to "firstName".
                                "lastName": $scope.userInfo1.user.lastName, // <---- added property of "lastName" please remind to person making models.
                            	"address": $scope.userInfo1.user.address, 	//(JSON object) (encrypted)
                            	"email": $scope.userInfo1.user.email,	//(encrypted)
                            	"cellPhone": $scope.userInfo1.user.cellPhone,	//(encrypted)
                            	"photo": $scope.userInfo1.user.photo,
                            	"gender": $scope.userInfo1.user.gender,	//(encrypted)
                            	"age": $scope.userInfo1.user.age,		//(encrypted)
                            	"facebookLoginAccount": $scope.userInfo1.user.facebookLoginAccount, 
			        "language": $scope.userInfo1.user.language
                        },
                        "preferences": {
                                "userID": $scope.userInfo1.preferences.userID,
                            	"sameSexOnly": $scope.userInfo1.preferences.sameSexOnly,
                            	"ageRange": $scope.userInfo1.preferences.ageRange,
                            	"likesDogs": $scope.userInfo1.preferences.likesDogs,
                		"needBikeRack": $scope.userInfo1.preferences.needBikeRack,
                		"needWheelchair": $scope.userInfo1.preferences.needWheelchair

                        },
                        "rating": {
                            	"raterID": $scope.userInfo1.rating.raterID, //(userId)
                            	"rateeID": $scope.userInfo1.rating.rateeID,//(userId)
                            	"tripID": $scope.userInfo1.rating.tripID,
                            	"rate": $scope.userInfo1.rating.rate // <---- using this "userRating" property as a fill in for what the model will have in the future
                            	            //            need to find some way of displaying html stars depending on what this number is.
                            	            //            displaying a number would be easier.
                        },
                        "vehicle": {
                            	"userID": $scope.userInfo1.vehicle.userID,
                            	"year": $scope.userInfo1.vehicle.year,
                            	"make": $scope.userInfo1.vehicle.make,
                            	"model": $scope.userInfo1.vehicle.model,
                            	"color": $scope.userInfo1.vehicle.color,
                            	"licensePlate": $scope.userInfo1.vehicle.licensePlate, //(encrypt)
                            	"bikeRack": $scope.userInfo1.vehicle.bikeRack,
                            	"wheelchairAccessible": $scope.userInfo1.vehicle.wheelchairAccessible,
			        "photo": $scope.userInfo1.vehicle.photo
                        }

                }; */
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
                        //$state.go("userProfile");
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
                $scope.rating.rate = $scope.userRating.rate;
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
                /*
                $scope.makeRatingStarArray = function(){
                        if ($scope.userInfo.rating.userRating > 0 && $scope.userInfo.rating.userRating < 0.5 ) {
                                return ""; // should return 0 stars based on Andrew's plugin
                        } else if($scope.userInfo.rating.rate >= 0.5 && 0.75) {
                        } else if ($scope.userInfo.rating.rate >= 1 && <= 1.25) {
                                return 
                        } else if ($scope.userInfo.rating.rate == 2) {
                                
                        } else if ($scope.userInfo.rating.rate == 3) {
                                
                        }
                }; 
                */
}]);