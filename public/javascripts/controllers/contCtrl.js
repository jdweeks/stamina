(function(){
  'use strict';
  
  angular.module('stamina.controllers').
    controller('contCtrl', ['$scope', '$http', function($scope, $http) { 
      $scope.contactData = {};
      
      $scope.sendFeedback = function() {
        $http.post('/api/contact', $scope.contactData)
          .success(function(data) {
            console.log(data);
            $scope.contactData = {};
            $('#success-modal').modal('toggle');
          })
          .error(function(data) {
            console.log('Error: ' + data);
            $('#failure-modal').modal('toggle');
          });
      };
    }]);
})();