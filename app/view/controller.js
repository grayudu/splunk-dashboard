'use strict';

angular.module('myApp.view', ['ngRoute'])

// .controller('HomeCtrl', ['$scope', 'splunk', function($scope, splunk) {
.controller('ViewCtrl', ['$scope', '$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope) {

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
          $scope.charts = x['config']['charts'];
          $scope.detailCharts = x['config']['detail_charts'];
          $scope.searches = x['config']['searches'];
          $scope.chartsWidth = (12 / $scope.charts.length);
          $scope.isCurrentView = isCurrentView;

          require(['splunkjs/ready!'], function () {
            require(['splunk_utils'], function (util) {
              $scope.charts.map(util.createChart);
              $scope.searches.map(util.createSearch);
              $scope.detailCharts.map(util.createChart);
            });
          });
        }
      })
    })
  });
}]);
