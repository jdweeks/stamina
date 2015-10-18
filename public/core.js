'use strict';

(function(){
  var app = angular.module('stamina', []);

  app.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.formData = {};
    $scope.updateFlag = false;
    $scope.showTable = true;
    $scope.showForm = false;
    $scope.title = "View Workouts";

    // GET all workouts from REST API
    $scope.getWorkouts = function() {
      $http.get('/api/workouts')
        .success(function(data) {
          console.log(data);
          $scope.workouts = data;
          // convert dates
          for (var i = 0; i < $scope.workouts.length; i++) {
            $scope.workouts[i].date = new Date($scope.workouts[i].date).toDateString();
          }
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
    $scope.getWorkouts();

    // when submitting add form, POST to API
    $scope.createWorkout = function() {
      $http.post('/api/workouts', $scope.formData)
        .success(function(data) { 
          console.log(data);
          // append newly created workout (given in response) 
          data.date = new Date(data.date).toDateString();
          $scope.workouts.push(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    // find workout by ID and set form data
    $scope.updateWorkout = function(id) {
      for (var i = 0; i < $scope.workouts.length; i++) {
        if ($scope.workouts[i]._id === id) {
          $scope.workoutIndex = i;
          $scope.formData = {
            date: new Date($scope.workouts[i].date),
            exercise: $scope.workouts[i].exercise,
            weight: $scope.workouts[i].weight,
            sets: $scope.workouts[i].sets,
            reps: $scope.workouts[i].reps
          };
          $scope.setUpdateFlag(true);
          $scope.setView(false, true);
          $scope.title = "Update Workout";
        }
      }
    };

    // update workout by PUT request
    $scope.saveUpdated = function() {
      $http.put('/api/workouts/'+$scope.workouts[$scope.workoutIndex]._id, $scope.formData)
        .success(function(data) {
          console.log(data);
          $scope.workouts[$scope.workoutIndex] = {
            date: new Date(data.date).toDateString(),
            exercise: data.exercise,
            weight: data.weight,
            sets: data.sets,
            reps: data.reps
          };
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

    // decide whether to POST or PUT on save
    $scope.decideAction = function() {
      if ($scope.updateFlag) {
        $scope.saveUpdated();
      }
      else {
        $scope.createWorkout();
      }
      // reset state variables
      $scope.setUpdateFlag(false);
      $scope.clearFormData();
      $scope.setView(true, false);
    };

    // decide which elements are shown in view
    $scope.setView = function(tableVal, formVal) {
      $scope.showTable = tableVal;
      $scope.showForm = formVal;
      if (tableVal) {
        $scope.title = "View Workouts";
      }
      else {
        $scope.title = "Submit Workout";
      }
    };

    $scope.clickSubmit = function() {
      $scope.setUpdateFlag(false);
      $scope.clearFormData();
      $scope.setView(false,true);
    };

    $scope.setUpdateFlag = function(val) {
      $scope.updateFlag = val;
    };

    $scope.clearFormData = function() {
      $scope.formData = {};
    };

  }]);
})();