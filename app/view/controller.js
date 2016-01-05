'use strict';

angular.module('myApp.view', ['ngRoute'])

.controller('ViewCtrl',
  ['$scope', '$http', '$routeParams', '$rootScope', 'Config', 'Menu',
  function($scope, $http, $routeParams, $rootScope, Config, Menu) {
    $scope.message = 'in controller';
    $scope.getMenuItemClass = function(config) {
      return (config.name === $routeParams.view_name) ? 'active' : '';
    };
    $scope.menu = Menu;

    $scope.config
}]);
