App.AudienceView = Ember.View.extend({

  // init: function() {
  //   this._super();
  //   this.set("controller", App.SliderController.create());
  // },

  didInsertElement: function() {
    var min = this.get('controller').get('model').get('min'),
        max = this.get('controller').get('model').get('max'),
        sliderMinValue = this.$().find(".slider-min-val"),
        sliderMaxValue = this.$().find(".slider-max-val")

    this.$().find('input').slider({
      min: min,
      max: max,
      value: [min, max],
      tooltip: 'hide'
    });
    
    sliderMinValue.text(min);
    sliderMaxValue.text(max);

    this.$().find('input').bind('slide', function (slideEvt) {
      sliderMinValue.text(slideEvt.value[0]);
      sliderMaxValue.text(slideEvt.value[1]);
      // console.log(this);
    });
    // console.log(this.get('controller').get('model').get('min'));
  },

  change: function(event) {
    console.log("slide");
  }

  // slide: function(evt) {
  //   alert("ClickableView was clicked!");
  // }
});