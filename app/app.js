'use strict';

var app = angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.view',
  'myApp.contact',
  'firebase',
  'angular.filter'
]);

app.factory('Config', function(Firebase, $firebaseObject) {
  var url = 'https://splunk-dashboard.firebaseio.com';
  return $firebaseObject(new Firebase(url));
});

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view/:view_name', {
    templateUrl: 'home/home.html',
    controller: 'ViewCtrl'
  });
  $routeProvider.when('/contact', {
    templateUrl: 'contact/template.html',
    controller: 'ContactCtrl'
  });
  $routeProvider.otherwise({
    redirectTo: '/login'
  });
}]);

require.config({
  baseUrl: "static/"
});

splunkjs.config({
  proxyPath: "/proxy",
  scheme: "https",
  host: "localhost",
  port: 8089,
  authenticate: function(done) {
    require([
      "jquery",
      "jquery.cookie"
    ], function($) {
      var splunkSessionKey = $.cookie("splunk_sessionkey");
      var splunkCurrentUser = $.cookie("splunk_username");

      if (splunkSessionKey) {
        done(null, {
          sessionKey: splunkSessionKey,
          username: splunkCurrentUser
        });
      },
      authenticate: function (done) {
        require([
          'jquery',
          'jquery.cookie'
        ], function ($) {
          var splunkSessionKey = $.cookie('splunk_sessionkey');
          var splunkCurrentUser = $.cookie('splunk_username');
          if (splunkSessionKey) {
            done(null, {
              sessionKey: splunkSessionKey,
              username: splunkCurrentUser
            });
          } else {
            window.location.replace('#/login');
          }
        });
      }
    });
  }
});
