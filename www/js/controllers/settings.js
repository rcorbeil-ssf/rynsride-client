angular.module('starter.controllers')
    .controller('SettingsCtrl', ['$scope', '$state', '$ionicHistory',
        function($scope, $state, $ionicHistory) {
            $scope.languages = {
               english: "English",
               spanish: "Spanish"
            };
        }
    ]);
