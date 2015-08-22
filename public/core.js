var stamina = angular.module('stamina', []);

stamina.controller('mainController', ['$scope', '$http', function($scope, $http) {
  $scope.formData = {};

  // landing page: get all workouts and display
  $http.get('/api/workouts')
    .success(function(data) {
      $scope.workouts = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // when submitting add form, send text to Express API
  $scope.createWorkout = function() {
    $http.post('/api/workouts', $scope.formData)
      .success(function(data) { 
        console.log(data);
        $scope.formData = {}; // clear form data
        // append newly created workout (given in response) 
        $scope.workouts.push(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // delete workout
  $scope.deleteWorkout = function(id) {
    $http.delete('/api/workouts/'+id)
      .success(function(data) {
        console.log(data);
        // remove deleted workout (given in response)
        for (var i = 0; i < $scope.workouts.length; i++) {
          if ($scope.workouts[i]._id === data.item._id) {
            $scope.workouts.splice(i, 1);
          }
        }
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}]);
