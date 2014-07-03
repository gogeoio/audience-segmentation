App.SliderComponent = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().slider();
    // console.log(this.controller);
  }
});

Ember.Handlebars.helper('slider-component', App.SliderComponent);

Ember.TextField.reopen({
  attributeBindings: ['data-slider-min', 'data-slider-max', 'data-slider-value']
});

Ember.Handlebars.helper('getSliderValue', function(min, max) {
  return "[" + min + "," + max + "]";
});