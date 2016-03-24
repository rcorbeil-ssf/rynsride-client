angular.module('starter.controllers')
.controller('UserProfileSettingsCtrl', ['$scope', '$rootScope', '$state', '$ionicHistory', '$timeout', 'ionicMaterialInk', '$translate',
        'ionicMaterialMotion',
        function($scope, $rootScope, $state, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $translate) {
                $scope.userInfo = {
                        "user": {
                                "firstName": "Leif", // <---- changed property name from "name" to "firstName".
                                "lastName": "", // <---- added property of "lastName" please remind to person making models.
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
                            	"year": 2010, // <---- added this for the sake of having more info on the car.
                            	"make": "Kia", 
                            	"model": "Soul",
                            	"color": "Blue",
                            	"licensePlate": "", //(encrypt)
                            	"bikeRack": "",
                            	"wheelchairAccessible": "",
			        "photo": "http://1.cdn.fisherkia.inspirelightning.com/wp-content/uploads/2014/12/Caribbean-Blue-Kia-Soul-1.jpg"
                        }

                };
                $scope.placeholderFinder = function (object, property, name){
                        if ($scope.userInfo[object][property] == ""){
                                return name;
                        } else {
                               return $scope.userInfo[object][property]; 
                        } 
                };
}]);
