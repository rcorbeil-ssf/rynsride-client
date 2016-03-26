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
            /*1. Language setting needs to be pushed to back end
              Stored to user model that way if a user logs in 
              on a different phone or online it will change to
              the users preffered languages*/
            $scope.setLanguage = function() {
                SSFTranslateService.changeLanguage($scope.languages.change);
            };
            /*2. Will Log out user and remove their token from back end.
              Log out service already made*/
            $scope.logout = function() {
                UsersService.logout;
            };
            /*3. EULA button will just use a ui-sref to link to the
              EULA page*/
            /*4. Re-run Wizard will take user back to wizard page*/  
        }
    ]);
