(function(){
  'use strict';
    
  angular.module('stamina.controllers', []).
  
    /* Main Controller */
    controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
      var updateFlag = false;
      $scope.volume = {};
      $scope.records = {};
      $scope.workouts = [];
      $scope.formData = {};
      $scope.streak = 0;

      // count user's streak in days
      function countStreak(workouts) {
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

      // get all workouts
      function getWorkouts() {
        $http.get('/api/workouts')
          .success(function(data) {
            $scope.workouts = data;
            countStreak(data);
            for (var i = 0; i < $scope.workouts.length; i++)
              $scope.workouts[i].date = new Date($scope.workouts[i].date).toDateString();
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };
      getWorkouts();
      
      function getVolume(name) {
        $http.get('/api/volume?name=' + name)
          .success(function(data) {
            $scope.volume[name] = data;
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };
      getVolume('Squat');
      getVolume('Bench');
      getVolume('Deadlift');
      getVolume('Press');

      function getRecords(name) {
        $http.get('/api/records?name=' + name)
          .success(function(data) {
            $scope.records[name] = data;
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };
      getRecords('Squat');
      getRecords('Bench');
      getRecords('Deadlift');
      getRecords('Press');
      
      // add a new workout
      function createWorkout() {
        $http.post('/api/workouts', $scope.formData)
          .success(function(data) {
            console.log(data);
            data.date = new Date(data.date).toDateString();
            $scope.workouts.push(data);

            getVolume(data.exercise);
            getRecords(data.exercise);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };
      
      // update workout by PUT request
      function saveUpdated() {
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

            $scope.getVolume(data.exercise);
            $scope.getRecords(data.exercise);
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

            updateFlag = true;
          }
        }
      };
      
      // delete workout
      $scope.deleteWorkout = function(id) {
        $http.delete('/api/workouts/'+id)
          .success(function(data) {
            console.log(data);
            for (var i = 0; i < $scope.workouts.length; i++)
              if ($scope.workouts[i]._id === data.item._id)
                $scope.workouts.splice(i, 1);

            getVolume(data.item.exercise);
            getRecords(data.item.exercise);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };

      // decide whether to POST or PUT on save
      $scope.decideAction = function() {
        if (updateFlag) saveUpdated();
        else createWorkout();

        updateFlag = false;
        $scope.formData = {};
      };
    }]).
    
    /* Contact Controller */
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
