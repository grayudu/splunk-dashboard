'use strict';

var a = angular.module('myApp.view', ['ngRoute']);

var viewCtrl = function($scope, $http, $routeParams, $rootScope, Config,
  Menu, $timeout) {
  $scope.getMenuItemClass = function(config) {
    return (config.name === $routeParams.view_name) ?
      'active' : '';
  };
  $scope.view_name = $routeParams.view_name;
  $scope.menu = Menu;
  $scope.panels = [];

  var deps = [
    "splunkjs/ready!",
    "splunk_utils"
  ];
  require(deps, function(mvc, util) {
    Config.$loaded().then(function() {

      angular.forEach(Config.searches, function(value, key) {
        util.createSearch(value);
      });

      angular.forEach(Config.menu, function(value, key) {
        if (value.name === $scope.view_name) {
          angular.forEach(value.Panels, function(panel) {
            console.log(panel);
            $scope.panels.push(panel);
            $timeout(function() {
              console.log('here in timeout');
              util.createChart(panel);
            })
          });
        }
      });

    });

  });
}

a.controller('ViewCtrl', [
  '$scope',
  '$http',
  '$routeParams',
  '$rootScope',
  'Config',
  'Menu',
  '$timeout',
  viewCtrl
]);
