'use strict';

function SplunkService() {

}

angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.userCharacteristics',
  'myApp.login'
]).
service('splunk', SplunkService).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/user_characteristics', {
    templateUrl: 'home/home.html',
    controller: 'UserCharacteristicsCtrl'
  });
  $routeProvider.otherwise({
    redirectTo: '/home'});
}]);

require.config({
  baseUrl: 'static/',
});

require(['splunkjs/config'], function() {
  splunkjs.config({
    port: 8089,
    scheme: 'https',
    proxyPath: '/proxy',
    host: 'localhost',
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