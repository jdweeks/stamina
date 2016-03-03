(function() {
  'use strict';
  
  angular.module('stamina', ['stamina.controllers', 'ngRoute', 'ngAnimate']).
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
        
      $locationProvider.html5Mode(false);
    }])
    
    .controller('mainCtrl', ['$rootScope', '$route', function($rootScope, $route) {
      // ensure navigation menu closes when route changes
      $rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
        if (prev && prev.redirectTo !== '/dashboard') { // disregard initial load
          if (curr && curr.originalPath !== '/update/:id') // disregard update route
            $('.navbar-toggle').click();
        }
      });
    }]);
    
  angular.module('stamina.controllers', []);
})();
