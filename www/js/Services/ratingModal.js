angular.module('starter.services')
.service('RatingService', ['$ionicModal', "RatingsService", function($ionicModal, RatingsService) {
    
    var service = this;
    
    service.rate = function($event, $scope, title, who, continueFunction) {
        // who is from the instance matched model
        $scope.user = {};
        
        var template =
            '<ion-modal-view>'+
                '<ion-header-bar>'+
                    '<h1 class="title">' +  title + '</h1>'+
                    '<div class="button button-icon button-clear" ng-click="closeModal()"><button class="button-icon icon ion-close-round"></button></div>' +
                '</ion-header-bar>'+
                '<ion-content>' +
                       
                    "<form ng-submit='submitRating()' class = 'padding'>" +
                        "<div class='card item item-text-wrap'>" +
                            '<div class="item item-divider" align="center">' +
                                '{{"RATING.DRIVER_RATING" | translate}}' +
                            '</div>' +
                            '<div>' +
                                '<i class="col text-center icon ion-ios-person" style="font-size: 75px;"></i>' +
                                '<rating ng-model="rating.default" max="rating.max" align="center"></rating>' +
                            '</div>' +
                            '<ion-item>' +
                                '<textarea class="comments" ng-model="rating.comments" rows="10" name="comments" placeholder="Comments"></textarea>' +
                            '</ion-item>' +
                        '</div>' +
                        '<button class="button button-block ssf-button button-calm" type="submit">' +
                            '{{"FORMS.BUTTONS.SUBMIT" | translate}}' +
                        '</button>' +
                    '</form>' +
                    
                '</ion-content>'+
            '</ion-modal-view>';
        
        $scope.rate = $ionicModal.fromTemplate(template, {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        });
        $scope.rate.show();

        
        $scope.closeRatingModal = function() {
            $scope.rate.remove();
            if(continueFunction !== undefined)
                $scope[continueFunction]();
        };
        $scope.closeModal = function() {
            $scope.rate.remove();
        };
    };
    
}]);