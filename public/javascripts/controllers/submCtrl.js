(function() {
  'use strict';
  
  angular.module('stamina.controllers').
    controller('submCtrl', ['$scope', '$http', function($scope, $http) {
      $scope.formData = {};
      
      $scope.createWorkout = function() {
        $http.post('/api/workouts', $scope.formData)
          .success(function(data) {
            console.log(data);
            $scope.formData = {};
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };
    }]);
})();