'use strict';

var map = null;
var group = null;
var polygon = null;

var editableLayers = null;

var databaseName = 'geo_summary';
var collectionName = 'places_us_4m';
var mapkey = '141bb3be-619a-4ffd-9aab-664ad92e568e';

var cluster = null;

var gogeoUrl = 'https://{s}.gogeo.io';
var geoAggUrl = 'https://maps.gogeo.io/geoagg';

var addCluster = function(clusterUrl, subdomains, group) {
  var options = {
    maxZoom: 18,
    subdomains: subdomains,
    useJsonP: true,
    calculateClusterQtd: function(zoom) {
      if (zoom >= 6) {
        return 2;
      } else {
        return 1;
      }
    }
  };

  cluster = L.tileCluster(clusterUrl, options);
  group.addLayer(cluster);

  return cluster;
};

var configureSize = function() {
  var innerHeight = window.innerHeight;

  $('#map').css('height', innerHeight + 'px');
};

var initMaps = function() {
  var options = {
    attributionControl: false,
    minZoom: 4,
    maxZoom: 14
  };

  map = L.map('map', options).setView([54.367759, -105.695343], 4);

  group = new L.LayerGroup().addTo(map);

  var ggl = new L.Google('ROADMAP', options);
  map.addLayer(ggl);

  var clusterUrl = gogeoUrl + '/map/' + databaseName + '/' + collectionName + '/{z}/{x}/{y}/cluster.json?mapkey=' + mapkey + '&callback={cb}',
      subdomains = ['m1', 'm2', 'm3'];
  // addCluster(clusterUrl, subdomains, group);

  configureSize();

  var bounds = map.getBounds();
};

$(window).resize(
  function() {
    configureSize();
  }
);
var amts=["Menor que 5 salarios","entre 5 e 10 salarios","entre 10 e 15 salarios","entre 15 e 20 salarios","maior que 20 salarios"];

$("#ex2").slider({
  min: 0,
  max: amts.length - 1,
  value: [0, amts.length - 1],
  tooltip: 'hide'
});
$("#ex2").on('slide', function(slideEvt) {
  // console.log(slideEvt.value[0]);
  $("#sliderMinVal").text(amts[slideEvt.value[0]]);
  $("#sliderMaxVal").text(amts[slideEvt.value[1]]);
});
$("#sliderMinVal").text(amts[0]);
$("#sliderMaxVal").text(amts[amts.length - 1]);
initMaps();