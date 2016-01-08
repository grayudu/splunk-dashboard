'use strict';

var a = angular.module('myApp.view', ['ngRoute']);

var viewCtrl = function($scope, $http, $routeParams, $rootScope, Config,
  Menu) {
  $scope.getMenuItemClass = function(config) {
    return (config.name === $routeParams.view_name) ?
      'active' : '';
  };
  $scope.view_name = $routeParams.view_name;
  $scope.menu = Menu;

  var deps = [
    "splunkjs/ready!",
    "splunkjs/mvc/searchmanager",
    "splunkjs/mvc/chartview",
    "splunkjs/mvc/eventsviewerview"
  ];
  require(deps, function(mvc, SearchManager, ChartView, EventsViewerView) {
    var mysearch = new SearchManager({
      id: "search1",
      preview: true,
      cache: true,
      status_buckets: 300,
      search: "index=_internal | tail 1000 | stats count by sourcetype"
    });

    var mychart = new ChartView({
      id: "chart1",
      managerid: "search1",
      type: "bar",
      el: $("#mychart")
    }).render();

    var myeventsviewer = new EventsViewerView({
      id: "eviewer1",
      managerid: "search1",
      el: $("#myeventsviewer")
    }).render();
  });

}

a.controller('ViewCtrl', [
  '$scope',
  '$http',
  '$routeParams',
  '$rootScope',
  'Config',
  'Menu',
  viewCtrl
]);
