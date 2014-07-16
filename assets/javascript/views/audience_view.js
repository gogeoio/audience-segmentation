App.AudienceView = Ember.View.extend({

  // init: function() {
  //   this._super();
  //   this.set("controller", App.AudienceController.create());
  // },

  didInsertElement: function() {
    var controller = this.get('controller');
    var range = controller.get('model').get('range');

    if (range) {
      var min = 0,
          max = range.length - 1;
    }
    else {
      var min = controller.get('model').get('min'),
          max = controller.get('model').get('max');
    }

    var id = controller.get('model').get('id'),
        sliderMinValue = this.$().find(".slider-min-val"),
        sliderMaxValue = this.$().find(".slider-max-val");

    this.$().find('.span2').slider({
      min: min,
      max: max,
      value: [min, max],
      tooltip: 'hide'
    });
    
    if (range) {
      sliderMinValue.text(range[min]);
      sliderMaxValue.text(range[max]);

      this.$().find('.span2').bind('slide', function (slideEvt) {
        var minSlider = slideEvt.value[0],
            maxSlider = slideEvt.value[1];
        sliderMinValue.text(range[minSlider]);
        sliderMaxValue.text(range[maxSlider]);
        controller.set('range', range.slice(minSlider, maxSlider + 1));
      });
    }
    else {
      sliderMinValue.text(min);
      sliderMaxValue.text(max);

      this.$().find('.span2').bind('slide', function (slideEvt) {
        var minSlider = slideEvt.value[0],
            maxSlider = slideEvt.value[1];
        sliderMinValue.text(minSlider);
        sliderMaxValue.text(maxSlider);
        controller.set('min', minSlider);
        controller.set('max', maxSlider);
      });
    }

    this.$().find(':checkbox').each(function(index, element) {
      $(element).on('click', function(event) {
        var options = controller.get('options'),
            optionValue = $(this).attr('value');
        
        if($(this).attr('checked')) {
          $(this).removeAttr('checked');
          
          var indexOption = options.indexOf(optionValue);
          options.splice(indexOption, 1)
        } 
        else {
          $(this).attr('checked', true);
          
          options.push(optionValue);
        }
        
        controller.set('options', options);
      });
    });

    this.$().find('.btn').on('click', function(event) {
      // elem.find('[type=checkbox]');
        var modelObj = controller.get('model').getProperties('attribute', 'min', 'max', 'options', 'range');
        controller.send('applyThematicMap', modelObj);
    });

     // this.$().find('.collapse').collapse({
     //    parent: "#accordion",
     //    toggle: false
     //  });

     // this.$().find('.collapse').on('show.bs.collapse', function () {
     //    console.log("show");
     //  });

    // $( ".panel-default" ).wrapAll( "<div class='panel-group' id='accordion'>");
    // console.log(this.get('controller').get('model').get('min'));
  },

  // click: function(event) {
  //   console.log(event);
  // }

  // slide: function(evt) {
  //   alert("ClickableView was clicked!");
  // }
});