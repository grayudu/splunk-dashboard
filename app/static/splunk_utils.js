'use strict'

var deps = [
  'splunkjs/mvc/chartview',
  'splunkjs/mvc/eventsviewerview',
  'splunkjs/mvc/searchmanager',
  'splunkjs/mvc',
  'underscore',
];

define(deps, function(ChartView, EventsViewerView, SearchManager, mvc, _) {

  var coalesceMenuTitles = function(config) {
    return _.map(config, function(c) {
      c['menu_title'] = c['menu_title'] ? c['menu_title'] : c['title'];
    });
  }

  var createChart = function(chart) {
    var oldChart = mvc.Components.getInstance(chart.id);
    if (oldChart) {
      oldChart.dispose();
    }

    var options = {}

    Object.getOwnPropertyNames(chart).forEach(function(val, index, array) {
      var excludedValues = ['class', 'description', 'title',
        '$$hashKey', 'el'
      ];
      if (excludedValues.indexOf(val) == -1) {
        var fixedVal = val.replace(/_/g, ".");
        options[fixedVal] = chart[val];
      }
    });

    options.el = eval(chart.el);
    var evalString = 'new ' + chart.class + '(options).render()';
    return eval(evalString);
  };

  var createSearch = function(search) {
    var oldSearch = mvc.Components.getInstance(search.id);
    if (oldSearch) {
      oldSearch.dispose();
    }
    var options = {
      id: search.id,
      preview: search.preview,
      cache: search.cache,
      status_buckets: search.status_buckets,
      search: search.search,
    };
    var evalString = 'new ' + search.class + '(options)';
    eval(evalString);
  };

  return {
    createChart: createChart,
    createSearch: createSearch,
    coalesceMenuTitles: coalesceMenuTitles,
  };
});
