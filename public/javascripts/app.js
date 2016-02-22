(function() {
  'use strict';
  
  angular.module('stamina', ['stamina.controllers', 'ngRoute']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/dashboard', {
          templateUrl: '/partials/dashboard',
          controller: 'dashCtrl'
        }).
        when('/submit', {
          templateUrl: '/partials/submit',
          controller: 'submCtrl'
        }).
        when('/update/:id', {
          templateUrl: function(params) {
            return '/api/workouts/' + params.id;
          },
          controller: 'updCtrl'
        }).
        when('/contact', {
          templateUrl: '/partials/contact',
          controller: 'contCtrl'
        }).
        when('/about', {
          templateUrl: '/partials/about'
        }).
        otherwise({
          redirectTo: '/dashboard'
        });
        
      $locationProvider.html5Mode(true);
    }]);
    
  angular.module('stamina.controllers', []);
})();
