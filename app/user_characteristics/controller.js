'use strict';

angular.module('myApp.userCharacteristics', ['ngRoute'])

// .controller('HomeCtrl', ['$scope', 'splunk', function($scope, splunk) {
.controller('UserCharacteristicsCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.title = "User Characteristics"

  function isCurrentCategory(v) {
    return v === 'userCharacteristics';
  }
  $scope.isCurrentCategory = isCurrentCategory;

  $http.get('configuration/charts.json').success(function(data) {
    $scope.charts = data;
  })

  $http.get('configuration/searches.json').success(function(data) {
    $scope.searches = data;
  })

  $http.get('configuration/details.json').success(function(data) {
    $scope.details = data;
  })

  var deps = [
      'splunkjs/ready!',
      'util',
      'splunk_utils'
  ];
  require(deps, function () {

    var mvc = require('splunkjs/mvc');

    var destroyInstance = function(instance) {
        mvc.Components.getInstance(instance.id).dispose();
    }

    require(['splunk_utils'], function(util) {
      $scope.charts.map(util.createChart);
      $scope.details.map(util.createChart);
      $scope.searches.map(util.createSearch);
    });

    $scope.$on('$destroy', function() {
      $scope.charts.map(destroyInstance);
      $scope.details.map(destroyInstance);
      $scope.searches.map(destroyInstance);
    });

  });
}]);
