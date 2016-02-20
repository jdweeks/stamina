(function() {
  'use strict';
  
  angular.module('stamina', ['stamina.controllers', 'ngRoute']).
    config(['$routeProvider', function($routeProvider) {
      $routeProvider.
        when('/dashboard', {
          templateUrl: '/partials/dashboard',
          controller: 'mainCtrl'
        }).
        when('/submit', {
          templateUrl: 'partials/submit',
          controller: 'mainCtrl'
        }).
        when('/contact', {
          templateUrl: 'partials/contact',
          controller: 'contCtrl'
        }).
        when('/about', {
          templateUrl: 'partials/about'
        }).
        otherwise({
          redirectTo: '/dashboard'
        });
    }]);
})();
