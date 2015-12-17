'use strict';

require.config({
  baseUrl: "static/",
});

require(["splunkjs/config"], function() {
  splunkjs.config({
    port: 8089,
    scheme: "https",
    host: "ec2-52-32-71-47.us-west-2.compute.amazonaws.com",
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

.controller('HomeCtrl', ['$scope', function($scope) {

  function isCurrentCategory(v) {
    return v === 'home';
  }
  $scope.isCurrentCategory = isCurrentCategory;

  var deps = [
      "splunkjs/ready!",
      "splunkjs/mvc/searchmanager",
      "splunkjs/mvc/chartview",
      "splunkjs/mvc/eventsviewerview",
      "util"
  ];
  require(deps, function (that) {
      var SearchManager = require("splunkjs/mvc/searchmanager");
      var ChartView = require("splunkjs/mvc/chartview");
      var EventsViewerView = require("splunkjs/mvc/eventsviewerview");

      console.log('here');

      if (typeof that.Components.attributes.search1 === 'undefined') {
        var mysearch = new SearchManager({
            id: "search1",
            preview: true,
            cache: true,
            status_buckets: 300,
            search: "index=_internal | head 1000 | stats count by sourcetype"
        });
      }

      if (typeof that.Components.attributes.mychart === 'undefined') {
        console.log('render');
        var mychart = new ChartView({
            id: 'mychart',
            managerid: "search1",
            type: "bar",
            el: $("#mychart")
        }).render();
      }
      else {
        console.log('rerender');
        var chart = splunkjs.mvc.Components.getInstance('mychart');
        console.log(chart);
        chart.settings.set('height', 600);
        chart.show();
        chart.render();
        chart.createChart();
      }
  });
}]);
