'use strict'

require.config({
  baseUrl: "static/"
});

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', function($scope) {
  function onLogin() {
    require([
      "jquery",
      "splunkjs/splunk",
    ], function($, jssdk) {
      var http = new jssdk.ProxyHttp("/proxy");
      var service = new jssdk.Service(http, {
        username: "admin",
        scheme: "https",
        host: "localhost",
        port: 8089
      });
      service.login(function(err) {
        if (!err) {
          var key = service.sessionKey;
          $.cookie("splunk_sessionkey", key);
          $.cookie("splunk_username", 'admin');
          window.location.replace("/#/view/Home");
        } else {
          console.error("Login failed: ", err);
        }
      });
    });
  }

  $scope.onLogin = onLogin;
}]);
