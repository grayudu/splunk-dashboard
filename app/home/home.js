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

    var mysearch = new SearchManager({
        id: "search1",
        preview: true,
        cache: true,
        status_buckets: 300,
        search: "index=_internal | head 1000 | stats count by sourcetype"
    });

    var mychart = new ChartView({
        id: 'mychart',
        managerid: "search1",
        type: "bar",
        el: $("#mychart")
    }).render();
  });

}]);
