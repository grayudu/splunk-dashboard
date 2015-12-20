'use strict';

angular.module('myApp.userCharacteristics', ['ngRoute'])

// .controller('HomeCtrl', ['$scope', 'splunk', function($scope, splunk) {
.controller('UserCharacteristicsCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.title = "User Characteristics"

  function isCurrentCategory(v) {
    return v === 'user_characteristics';
  }
  $scope.isCurrentCategory = isCurrentCategory;

  $http.get('configuration/charts.json').then(function(data) {
    $scope.charts = data.data;
    $scope.chartsWidth = (12 / $scope.charts.length);
    require(['splunkjs/ready!'], function () {
      require(['splunk_utils'], function (util) {
        $scope.charts.map(util.createChart);
      });
    });
  })

  $http.get('configuration/searches.json').then(function(data) {
    $scope.searches = data.data;
    require(['splunkjs/ready!'], function () {
      require(['splunk_utils'], function (util) {
        $scope.searches.map(util.createSearch);
      });
    });
  })

  $http.get('configuration/details.json').then(function(data) {
    $scope.details = data.data;
    require(['splunkjs/ready!'], function () {
      require(['splunk_utils'], function (util) {
        $scope.details.map(util.createChart);
      });
    });
  })
}]);
