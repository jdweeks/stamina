(function() {
  'use strict';
  
  angular.module('stamina.controllers').
    controller('updCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
      $scope.updateData = {};
      var id = $routeParams.id;
      
      function getWorkout() {
        $http.get('/api/workouts/' + id + '?format=json')
          .success(function(data) {
            $scope.updateData = {
              date: new Date(data.date),
              exercise: data.exercise,
              weight: data.weight,
              reps: data.reps,
              sets: data.sets
            };
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };
      getWorkout();
      
      $scope.updateWorkout = function() {
        $http.put('/api/workouts/' + id, $scope.updateData)
          .success(function(data) {
            console.log(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };
    }]);
})();