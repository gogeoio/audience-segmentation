var configureSize = function() {
  var innerHeight = window.innerHeight;

  $('#map').css('height', innerHeight + 'px');
};

App.initializer({
  name: "initMap",
  initialize: function() {
    var options = {
      attributionControl: false,
      minZoom: 4,
      maxZoom: 14
    };

    map = L.map('map', options).setView([54.367759, -105.695343], 4);

    group = new L.LayerGroup().addTo(map);

    var ggl = new L.Google('ROADMAP', options);
    map.addLayer(ggl);

    // var clusterUrl = gogeoUrl + '/map/' + databaseName + '/' + collectionName + '/{z}/{x}/{y}/cluster.json?mapkey=' + mapkey + '&callback={cb}',
    //     subdomains = ['m1', 'm2', 'm3'];
    // addCluster(clusterUrl, subdomains, group);

    configureSize();

    var bounds = map.getBounds();

    $(window).resize(
      function() {
        configureSize();
      }
    );
  }
});

App.initializer({
  name: "initSlider",
  initialize: function() {
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
  }
});