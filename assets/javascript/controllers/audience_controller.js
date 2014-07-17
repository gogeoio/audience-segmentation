App.AudienceController = Ember.ObjectController.extend({

  // needs: "panel",
  actions: {
    updateLayer: function(string, stylename, query, geojson) {
      console.log(query);
      var url = ["http://localhost:9090", "map", "db01", "county05", "{z}", "{x}", "{y}", "tile.png"].join("/");

      url += "?mapkey=a8b87a5e-7fc5-467e-ab8f-8626ef54224d";

      if (stylename) {
        url = url.replace('&amp;', '&') + '&stylename=' + stylename;
      }

      // if (query) {
      //   var encoded = encodeURIComponent(JSON.stringify(query));
      //   url = url + '&q=' + encoded;
      // }

      if (geojson) {
        string = JSON.stringify(geojson);
        url = url + '&geometry_points=' + string;
      }

      if (string) {
        var bitArray = sjcl.hash.sha256.hash(string);
        var hash = sjcl.codec.hex.fromBits(bitArray);
        url = url + '&_=' + hash;
      }

      var layer = App.group.getLayers()[1];

      App.group.clearLayers();
      layer = L.tileLayer(url, {maxZoom: 18, subdomains: ['m1', 'm2', 'm3']});
      App.group.addLayer(layer);
    },

    createLegend: function(legend, attribute, intervals) {
      $('#legend-div').removeAttr('style');

      var heights = [100, 115, 135, 155, 175, 195, 215, 235, 260];
      var height = heights[intervals - 3];
      $('#legend-div').css('height', height + 'px');

      var legendTitle = 'Number of People';
      $('#legend-title').text(legendTitle);

      var div_width = 0;

      var labels = $('#legend-labels');
      labels.find('li').remove();
      for (var i in legend) {
        var item = legend[i];
        var color = item.color;
        var min = item.min;
        var max = item.max;
        var text = min + " .. " + max;
        var string = "<li><span style='background: #COLOR;'></span>#TEXT</li>";
        string = string.replace('#COLOR', color);
        string = string.replace('#TEXT', text);

        if (string.length > div_width) {
          div_width = string.length;
        }

        labels.append(string);
      }

      $('#legend-div').css('width', ((div_width * 2) + 60) + 'px');
    },

    applyThematicMap: function(data) {
      var attribute = data.attribute;
          intervals = 5;
      
      var service_addr = "http://localhost:9090",
          databaseName = "db01",
          collectionName = "county05";
      
      var thisController = this;

      var url = [service_addr, 'thematic',databaseName, collectionName];
      url = url.join('/');

      url += "?mapkey=a8b87a5e-7fc5-467e-ab8f-8626ef54224d";

      var query = '{"query": ';
      
      if(data.range) {
        var selectedRange = data.range;

        query += '{"filtered": {"filter": {"or": ['

        for(var i in selectedRange) {
          query += '{"term": {"' + attribute + '": "' + i + '"} },';
        }

        query = query.slice(0, query.length - 1);
        query += '] } } }';
      }
      else {
        if(data.options) {
          var options = data.options;
          query += '{"bool": {"should": [';
          
          for(var i = 0; i < options.length; i++) {
            optionAttr = options[i].replace(" ", "_")
            query += '{"range": {"' + optionAttr + '": {"gte": ' + data.min + ', "lte": ' + data.max + '} } },';
          }
          
          query = query.slice(0, query.length - 1);
          query += '], "minimum_should_match": ' + options.length + ' } }'
        } else {
          query += '{"range": {"' + attribute + '": {"gte": ' + data.min + ', "lte": ' + data.max + '}}}';
        }
      }

      query += "}";

      console.log(query);

      var options = {
        name: 'thematic_map_demo',
        column: attribute,
        intervals: intervals,
        q: JSON.parse(query)
      };

      console.log(JSON.stringify(options));

      $.ajax({
        url: url,
        data: JSON.stringify(options),
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
        dataType: 'json',
        async: true,
        success: function(data) {
          // console.log(data);
          thisController.send('createLegend', data.legend, attribute, intervals);
          // createLegend(response.legend, attribute, intervals);
          thisController.send('updateLayer', data.carto, data.stylename, data.query)
          // updateLayer(response.carto, response.stylename, response.query);
        },
        error: function(error) {
          // Log any error.
          // console.log('Error', error);
          $('#query-alert').modal('toggle');
        },
        cache: false
      });
      // $.post(url, options,
      //   function (response) {
      //     if (response) {
      //       createLegend(response.legend, attribute, intervals);
      //       updateLayer(response.carto, response.stylename, response.query);
      //     }
      //   }
      // );
    }

  },
  
  collapseRef: function() {
    var id = this.get('model').get('id');
    return "#collapse-" + id;
  }.property(),

  collapseId: function() {
    var id = this.get('model').get('id');
    return "collapse-" + id;
  }.property()

});