angular.module('starter.controllers')
.controller('UserProfileCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk', '$translate',
        'ionicMaterialMotion', '$ionicNavBarDelegate',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicNavBarDelegate, $translate) {
                /* TO-DO: 
                        need a way to get the user profile info of the profile click. needs to be included in
                        the ng-click on the HTML of the page that displays the "profile link". Could be a photo,
                        Name, Car, etc.
                        We also need to perform a GET request to both the User Model & Preferences Model.
                        Need to set $scope.userInfo.User = response.data; (of the User Model GET Method).
                        Need to set $scope.userInfo.Preferences = response.data; (of the Preferences Model GET Method).
                */
                $scope.userInfo = {
                        "user": {
                                "name": "Leif",
                            	"address": "3000 University Ave, San Diego, CA 92104", 	//(JSON object) (encrypted)
                            	"email": "leif@leif.com",	//(encrypted)
                            	"cellPhone": "619-619-6199",	//(encrypted)
                            	"photo": "http://www.liveyachting.com/wp-content/uploads/2010/03/IMG_7130_SML.jpg",
                            	"gender": true,	//(encrypted)
                            	"age": 21,		//(encrypted)
                            	"facebookLoginAccount": "", 
			        "language": "en"
                        },
                        "preferences": {
                                "userID": "123",
                            	"sameSexOnly": false,
                            	"ageRange": "18-30",
                            	"likesDogs": true,
                		"needBikeRack": false,
                		"needWheelchair": false

                        },
                        "rating": {
                            	"raterID": "123", //(userId)
                            	"rateeID": "22",//(userId)
                            	"tripID": "55",
                            	"rate": 4.5 /* <---- using this "userRating" property as a fill in for what the model will have in the future
                            	                        need to find some way of displaying html stars depending on what this number is.
                            	                        displaying a number would be easier.
                            	                */
                        },
                        "vehicle": {
                            	"userID": "",
                            	"year": 2010,
                            	"make": "Kia",
                            	"model": "Soul",
                            	"color": "Blue",
                            	"licensePlate": "", //(encrypt)
                            	"bikeRack": "",
                            	"wheelchairAccessible": "",
			        "photo": "http://1.cdn.fisherkia.inspirelightning.com/wp-content/uploads/2014/12/Caribbean-Blue-Kia-Soul-1.jpg"
                        }

                };
                $scope.findGender = function() {
                        
                        if ($scope.userInfo.user.gender == true) {
                                return 'USER_PROFILE.GENDER_MALE';
                        } else if ($scope.userInfo.user.gender == false) {
                                return 'USER_PROFILE.GENDER_FEMALE';
                        } else if ($scope.userInfo.user.gender == null) {
                                return "";
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