'use strict';

var viewModule = angular.module('myApp.view', ['ngRoute']);

var viewCtrl = function($scope, $routeParams, $rootScope, Config,
  $timeout, $filter) {
  $scope.getMenuItemClass = function(config) {
    return (config.name === $routeParams.view_name) ?
      'active' : '';
  };
  $scope.view_name = $routeParams.view_name;
  $scope.panels = [];

  require(["splunkjs/ready!", "splunk_utils"], function(mvc, util) {
    Config.$loaded().then(function() {
      $scope.menu = Config.menu;

      angular.forEach(Config.searches, function(value, key) {
        util.createSearch(value);
      });

      angular.forEach(Config.menu, function(menu) {
        if (menu.name === $scope.view_name) {
          var rowMap = {};
          angular.forEach(menu.Panels, function(panel) {
            if (panel.row in rowMap) {
              rowMap[panel.row] += 1;
            } else {
              rowMap[panel.row] = 1;
            }
          });

          var orderedPanels = $filter('orderBy')(menu.Panels, 'row');
          angular.forEach(orderedPanels, function(panel) {
            panel.rowWidth = rowMap[panel.row];
            $scope.panels.push(panel);
            $timeout(function() {
              util.createChart(panel);
            })
          });
        }
      });

    });

  });
}

viewModule.controller('ViewCtrl', [
  '$scope',
  '$routeParams',
  '$rootScope',
  'Config',
  '$timeout',
  '$filter',
  viewCtrl
]);
