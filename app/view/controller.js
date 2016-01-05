'use strict';

angular.module('myApp.view', ['ngRoute'])

.controller('ViewCtrl',
  ['$scope', '$http', '$routeParams', '$rootScope', 'Config', 'Menu',
  function($scope, $http, $routeParams, $rootScope, Config, Menu) {
    $scope.getMenuItemClass = function(config) {
      return (config.name === $routeParams.view_name) ? 'active' : '';
    };
    $scope.view_name = $routeParams.view_name;
    $scope.menu = Menu;

}]);
