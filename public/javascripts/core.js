(function(){
  'use strict';
  var app = angular.module('stamina', []);

  app.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.formData = {};
    $scope.volume = {};
    $scope.records = {};
    $scope.workouts = [];
    $scope.updateFlag = false;
    $scope.showTable = true;
    $scope.showForm = false;
    $scope.streak = 0;
    $scope.title = "Dashboard";

    // count user's streak in days
    $scope.countStreak = function(workouts) {
      var today = new Date();
      var day_in_ms = 1000*60*60*24;
      for (var i = 0; i < workouts.length; i++) {
        var date = new Date(workouts[i].date);
        var diff = (today - date) / day_in_ms;
        if (diff < 1)
          $scope.streak += 1;
        today -= day_in_ms;
      }
    }

    // GET all workouts
    $scope.getWorkouts = function(next) {
      $http.get('/api/workouts')
        .success(function(data) {
          $scope.workouts = data;
          // convert dates
          for (var i = 0; i < $scope.workouts.length; i++) {
            $scope.workouts[i].date = new Date($scope.workouts[i].date).toDateString();
          }
          $scope.countStreak(data);
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
          for (var i = 0; i < $scope.workouts.length; i++)
            if ($scope.workouts[i]._id === data.item._id)
              $scope.workouts.splice(i, 1);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    // decide whether to POST or PUT on save
    $scope.decideAction = function() {
      if ($scope.updateFlag)
        $scope.saveUpdated();
      else
        $scope.createWorkout();
      // reset state variables
      $scope.setUpdateFlag(false);
      $scope.clearFormData();
      $scope.setView(true, false);
    };

    // decide which elements are shown in view
    $scope.setView = function(tableVal, formVal) {
      $scope.showTable = tableVal;
      $scope.showForm = formVal;
      $('.navbar-toggle').click();
      $scope.title = tableVal ? "Dashboard" : "Submit Workout";
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

    $scope.getVolume = function(name) {
      $http.get('/api/volume?name=' + name)
        .success(function(data) {
          $scope.volume[name] = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
    $scope.getVolume('Squat');
    $scope.getVolume('Bench');
    $scope.getVolume('Deadlift');
    $scope.getVolume('Press');

    $scope.getRecords = function(name) {
      $http.get('/api/records?name=' + name)
        .success(function(data) {
          $scope.records[name] = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    }
    $scope.getRecords('Squat');
    $scope.getRecords('Bench');
    $scope.getRecords('Deadlift');
    $scope.getRecords('Press');


  }]);
})();
