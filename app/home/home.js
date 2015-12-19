'use strict';

require.config({
  baseUrl: "static/",
});

require(["splunkjs/config"], function() {
  splunkjs.config({
    port: 8089,
    scheme: "https",
    proxyPath: "/proxy",
    host: "localhost",
    authenticate: function (done) {
        require([
            "jquery",
            "jquery.cookie"
        ], function ($) {
            var splunkSessionKey = $.cookie("splunk_sessionkey");
            var splunkCurrentUser = $.cookie("splunk_username");
            if (splunkSessionKey) {
                done(null, {
                    sessionKey: splunkSessionKey,
                    username: splunkCurrentUser
                });
            } else {
                window.location.replace("#/login");
            }
        });
    }
  });
});

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

// .controller('HomeCtrl', ['$scope', 'splunk', function($scope, splunk) {
.controller('HomeCtrl', ['$scope', function($scope) {

  function isCurrentCategory(v) {
    return v === 'home';
  }
  $scope.isCurrentCategory = isCurrentCategory;

  var charts = [
    {
      id: "mychart1",
      title: "Bar Chart",
      description: "Splunk Event Count by Sourcetype",
      managerid: "mysearch1",
      type: "bar",
      el: '$("#mychart1")'
    },
    {
      id: "mychart2",
      title: "Pie Chart",
      description: "Top 5 Event Sources",
      managerid: "mysearch2",
      type: "pie",
      el: '$("#mychart2")'
    },
    {
      id: "mychart3",
      title: "Timeline",
      description: "Events Over Time by Component",
      managerid: "mysearch3",
      type: "line",
      el: '$("#mychart3")'
    },
  ]

  $scope.charts = charts;

  var deps = [
      "splunkjs/ready!",
      "splunkjs/mvc/searchmanager",
      "splunkjs/mvc/chartview",
      "splunkjs/mvc/eventsviewerview",
      "util"
  ];
  require(deps, function () {

    var SearchManager = require("splunkjs/mvc/searchmanager");
    var ChartView = require("splunkjs/mvc/chartview");
    var EventsViewerView = require("splunkjs/mvc/eventsviewerview");
    var mvc = require("splunkjs/mvc");

    var mysearch1 = new SearchManager({
        id: "mysearch1",
        preview: true,
        cache: true,
        status_buckets: 300,
        search: "index=_internal | head 1000 | stats count by sourcetype"
    });

    var createChart = function(options) {
      new ChartView({
          id: options.id,
          managerid: options.managerid,
          type: options.type,
          el: eval(options.el),
      }).render();
    }

    charts.map(createChart);

    var mysearch2 = new SearchManager({
        id: "mysearch2",
        preview: true,
        cache: true,
        status_buckets: 300,
        search: "index=_internal | head 100 | stats count by source"
    });

    var mysearch3 = new SearchManager({
        id: "mysearch3",
        preview: true,
        cache: true,
        status_buckets: 300,
        search: "index=_internal earliest=-2d@d | timechart count by component"
    });

    var myeventsviewer = new EventsViewerView({
        id: "eviewer1",
        managerid: "mysearch1",
        el: $("#myeventsviewer")
    }).render();

    var destroyChart = function(chart) {
        mvc.Components.getInstance(chart.id).dispose();
    }

    $scope.$on("$destroy", function() {
      charts.map(destroyChart);
      mvc.Components.getInstance('mysearch1').dispose();
      mvc.Components.getInstance('mysearch2').dispose();
      mvc.Components.getInstance('mysearch3').dispose();
      mvc.Components.getInstance('eviewer1').dispose();
    });

  });

}]);
