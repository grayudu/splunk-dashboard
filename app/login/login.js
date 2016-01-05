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
      "splunkjs/splunk",
      "jquery",
      "jquery.cookie"
    ], function (jssdk, $) {
      var username = $("#usernamebox").val();
      var password = $("#pwbox").val();

      var http = new jssdk.ProxyHttp("/proxy");
      var service = new jssdk.Service(http);
      var key = service.sessionKey;
      $.cookie("splunk_sessionkey", key);
      $.cookie("splunk_username", username);
      window.location.href = "#/view/Home";

    });
  }
  $scope.onLogin = onLogin;
}]);
