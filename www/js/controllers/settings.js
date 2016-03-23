angular.module('starter.controllers')
    .controller('SettingsCtrl', ['$scope', '$state', '$ionicHistory', "SSFTranslateService", 'translation', "$translate", "UsersService",
        function($scope, $state, $ionicHistory, SSFTranslateService, translation, $translate, UsersService) {
            $scope.languages = {};
            $scope.filterOptions = {
                sort: [{
                    name: translation[0]
                }, {
                    name: translation[1],
                    state: "en"
                }, {
                    name: translation[2],
                    state: "es"
                }]
            };
            $scope.setLanguage = function() {
                SSFTranslateService.changeLanguage($scope.languages.change);
            };
            $scope.logout = function() {
                UsersService.logout;
            };
            
        }
    ]);
