(function() {
  'use strict';
  
  angular.module('stamina.controllers').
    controller('submCtrl', ['$scope', '$http', function($scope, $http) {
      $scope.formData = {};
      
      $scope.createWorkout = function() {
        $scope.formData.date = new Date();
        $http.post('/api/workouts', $scope.formData)
          .success(function(data) {
            console.log(data);
            $scope.formData = {};
            $('#success-modal').modal('toggle');
          })
          .error(function(data) {
            console.log('Error: ' + data);
            $('#failure-modal').modal('toggle');
          });
      };
    }]);
})();