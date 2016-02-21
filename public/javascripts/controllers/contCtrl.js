(function(){
  'use strict';
  
  angular.module('stamina.controllers').
    controller('contCtrl', ['$scope', '$http', function($scope, $http) { 
      $scope.contactData = {};
      
      $scope.sendFeedback = function() {
        $http.post('/contact', $scope.contactData)
          .success(function(data) {
            console.log(data);
            $scope.contactData = {};
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };
    }]);
})();