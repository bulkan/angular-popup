var popupApp = angular.module('app', [
  'ngRoute'
])
.config(function ($routeProvider) {
  'use strict';

  $routeProvider.when('/', {
    controller: 'PopupCtrl',
    templateUrl: '/partials/popup.html'
  }).otherwise({
    redirectTo: '/'
  });
});

popupApp.controller('PopupCtrl', ['$scope', '$window', '$interval', function PopupCtrl($scope, $window, $interval) {
  'use strict';

  $window.$scope = $scope;

  $scope.showPopup = function showPopup(){
    var left = screen.width/2 - 200
        , top = screen.height/2 - 250
        , popup = $window.open('/popup', '', "top=" + top + ",left=" + left + ",width=400,height=500")
        , interval = 1000;

    var i = $interval(function(){
      interval += 500;
      try {

        // value is the user_id returned from paypal
        if (popup.value){
          $interval.cancel(i);
          popup.close();
        }
      } catch(e){
        console.error(e);
      }
    }, interval);

  }



}]);
