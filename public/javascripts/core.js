(function(){
  'use strict';
  var app = angular.module('stamina', []);

  app.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.formData = {};
    $scope.contactData = {};

    $scope.volume = {};
    $scope.records = {};
    $scope.workouts = [];

    $scope.updateFlag = false;
    $scope.streak = 0;

    $scope.title = "Dashboard";
    $scope.show = {
      table: true,
      form: false,
      about: false,
      contact: false
    };
    $scope.titles = {
      table: "Dashboard",
      form: "Submit",
      about: "About",
      contact: "Contact"
    };

    // count user's streak in days
    $scope.countStreak = function(workouts) {
      var today = new Date();
      var prev = new Date();
      var day_in_ms = 1000*60*60*24;

      for (var i = 0; i < workouts.length; i++) {
        var date = new Date(workouts[i].date);
        var diff = (today - date) / day_in_ms;
        if (diff < 1 && (date - prev !== 0))
          $scope.streak++;

        today -= day_in_ms;
        prev = date;
      }
    }

    // GET all workouts
    $scope.getWorkouts = function() {
      $http.get('/api/workouts')
        .success(function(data) {
          $scope.workouts = data;
          // convert dates
          for (var i = 0; i < $scope.workouts.length; i++)
            $scope.workouts[i].date = new Date($scope.workouts[i].date).toDateString();
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

          $scope.getVolume(data.exercise); // update volume
          $scope.getRecords(data.exercise); // update records
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
          $scope.setView({ form: true });
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
            _id: data._id,
            date: new Date(data.date).toDateString(),
            exercise: data.exercise,
            weight: data.weight,
            sets: data.sets,
            reps: data.reps
          };

          $scope.getVolume(data.exercise); // update volume
          $scope.getRecords(data.exercise); // update records
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

          $scope.getVolume(data.item.exercise); // update volume
          $scope.getRecords(data.item.exercise); // update records
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    // decide whether to POST or PUT on save
    $scope.decideAction = function() {
      if ($scope.updateFlag)
        $scope.saveUpdated($scope.countStreak);
      else 
        $scope.createWorkout($scope.countStreak);

      // reset state variables
      $scope.setUpdateFlag(false);
      $scope.clearFormData();
      $scope.setView({ table: true });
    };

    // decide which elements are shown in view
    $scope.setView = function(obj) {
      // reset view
      for (var prop in $scope.show)
        $scope.show[prop] = false;

      // set view
      for (var prop in obj) {
        $scope.show[prop] = true;
        $scope.title = $scope.titles[prop];
      }

      // reset output values for form
      var weightOut = document.getElementById('weightOut');
      var setsOut = document.getElementById('setsOut');
      var repsOut = document.getElementById('repsOut');

      var weight = document.getElementById('weight');
      var sets = document.getElementById('sets');
      var reps = document.getElementById('reps');

      var wavg = (Number(weight.max) + Number(weight.min)) / 2;
      var savg = (Number(sets.max) + Number(sets.min)) / 2;
      var ravg = (Number(reps.max) + Number(reps.min)) / 2;

      weightOut.innerHTML = $scope.formData.weight || wavg;
      setsOut.innerHTML = $scope.formData.sets || savg;
      repsOut.innerHTML = $scope.formData.reps || ravg;
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
    };
    $scope.getRecords('Squat');
    $scope.getRecords('Bench');
    $scope.getRecords('Deadlift');
    $scope.getRecords('Press');

    $scope.clickSubmit = function() {
      $scope.setUpdateFlag(false);
      $scope.clearFormData();
      $scope.setView({ form: true });
    };

    $scope.setUpdateFlag = function(val) {
      $scope.updateFlag = val;
    };

    $scope.clearFormData = function() {
      $scope.formData = {};
    };

    $scope.sendFeedback = function() {
      $http.post('/contact', $scope.contactData)
        .success(function(data) {
          console.log(data);
          $scope.contactData = {};
          $scope.setView({ table: true });
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

  }]);
})();
