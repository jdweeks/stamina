(function(){
  'use strict';
    
  angular.module('stamina.controllers').
    controller('dashCtrl', ['$scope', '$http', function($scope, $http) {
      $scope.volume = {};
      $scope.records = {};
      $scope.workouts = [];
      $scope.streak = 0;

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
    }]);
})();
