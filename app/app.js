'use strict';

function SplunkService() {
  // var deps = [
  //     "splunkjs/ready!",
  //     "splunkjs/mvc/searchmanager",
  //     "splunkjs/mvc/chartview",
  //     "splunkjs/mvc/eventsviewerview",
  //     "util"
  // ];
  // require(deps, function () {
  //   var SearchManager = require("splunkjs/mvc/searchmanager");
  //   var ChartView = require("splunkjs/mvc/chartview");
  //   var EventsViewerView = require("splunkjs/mvc/eventsviewerview");
  //
  //   var mysearch = new SearchManager({
  //       id: "search1",
  //       preview: true,
  //       cache: true,
  //       status_buckets: 300,
  //       search: "index=_internal | head 1000 | stats count by sourcetype"
  //   });
  //
  //   var mychart = new ChartView({
  //       id: 'mychart',
  //       managerid: "search1",
  //       type: "bar",
  //       el: $("#mychart")
  //   }).render();
  // });
}

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.login'
]).
service('splunk', SplunkService).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/home'});
}]);
