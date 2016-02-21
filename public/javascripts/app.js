(function() {
  'use strict';
  
  angular.module('stamina', ['stamina.controllers', 'ngRoute']).
    config(['$routeProvider', function($routeProvider) {
      $routeProvider.
        when('/dashboard', {
          templateUrl: 'partials/dashboard',
          controller: 'dashCtrl'
        }).
        when('/submit', {
          templateUrl: 'partials/submit',
          controller: 'submCtrl'
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
    
  angular.module('stamina.controllers', []);
})();
