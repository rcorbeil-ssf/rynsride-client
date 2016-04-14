angular.module('starter.controllers')
    .controller('RiderPendingRideCtrl', ['$scope', '$state', '$ionicHistory', "UpdateUser", "SSFTranslateService", "getDriverData", "getTripInformation",
        function($scope, $state, $ionicHistory, UpdateUser, SSFTranslateService, getDriverData, getTripInformation) {
          
            $scope.pendingRiderCommit =  getDriverData;
            $scope.pendingRiderCommitInfo =  getTripInformation;
           
            $scope.cancel = function() {
                UpdateUser.riderPendingTripCanceled({state: "canceled"})
                    .then(function(res) {
                        if (res.status === 200) {
                            $state.go("riderPage");
                        }
                        else{
                            //Handle what happens if there's an error
                        }
                    });
            };
            
            $scope.toggle1 = function() {
                $scope.toggleA ^= true; 
            };
            $scope.toggle2 = function() {
                $scope.toggleB ^= true;
            };
        }
    ])
    
    .directive('toggle1', function () {
        return {
            restrict:'C',
            link: function (scope, element, attrs) {
    
                scope.toggle1Click = function(){
                    element.slideToggle();
                };
            }                  
        };
    })
    
    .directive('toggle2', function () {
        return {
            restrict:'C',
            link: function (scope, element, attrs) {
    
                scope.toggle2Click = function(){
                    element.slideToggle();
                };
                
            }                  
        };
    });