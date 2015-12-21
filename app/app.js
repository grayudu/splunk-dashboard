'use strict';

function SplunkService() {

}

angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.view',
  'myApp.contact',
]).
service('splunk', SplunkService).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view/:view_name', {
    templateUrl: 'home/home.html',
    controller: 'ViewCtrl'
  });
  $routeProvider.when('/contact', {
    templateUrl: 'contact/template.html',
    controller: 'ContactCtrl'
  });
  $routeProvider.otherwise({
    redirectTo: '/login'});
  }]);

  require.config({
    baseUrl: 'static/',
  });

  require(['splunkjs/config'], function(_) {
    splunkjs.config({
      port: 8089,
      scheme: 'https',
      proxyPath: '/proxy',
      host: 'localhost',
      freeLicense: true,
      onSessionExpired: function () {
        require(["jquery", "jquery.cookie"], function ($) {
          $.cookie("splunk_sessionkey", null, { path: '/'});
          $.cookie("splunk_username", null, { path: '/'});
          window.location.replace("#/login");
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
  });
