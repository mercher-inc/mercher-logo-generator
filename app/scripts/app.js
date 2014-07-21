'use strict';

/**
 * @ngdoc overview
 * @name mercherLogoGeneratorApp
 * @description
 * # mercherLogoGeneratorApp
 *
 * Main module of the application.
 */
angular
  .module('mercherLogoGeneratorApp', [
    'ui.router'
  ])
  .config(function ($locationProvider, $urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url:         '/',
        templateUrl: 'views/main.html',
        controller:  'MainCtrl'
      });
  });
