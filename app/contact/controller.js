'use strict';

angular.module('myApp.contact', ['ngRoute'])

// .controller('HomeCtrl', ['$scope', 'splunk', function($scope, splunk) {
.controller('ContactCtrl', ['$scope', '$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope) {

  $scope.title = "Contact Info"

  require(['underscore'], function(_) {
    var coalesceMenuTitles = function(cfg) {
      return _.map(cfg, function(c) {
        c['menu_title'] = c['menu_title'] ? c['menu_title'] : c['title'];
      });
    }

    $http.get('configuration/charts.json').then(function(data) {

      var config = _.pluck(data.data, 'config');
      $scope.menu = coalesceMenuTitles(config);
      $scope.menu = _.groupBy(config, function(g) {
        return g['menu_group'];
      });

      data.data.map(function(x) {
        var viewName = x['config']['url'];

        function isCurrentView(v) {
          return v === viewName;
        }

        if (viewName === $routeParams.view_name) {
          $scope.config = x['config'];
          $scope.isCurrentView = isCurrentView;

        }
      })
    })
  });
}]);
