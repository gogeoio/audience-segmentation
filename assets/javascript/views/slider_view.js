App.SliderView = Ember.View.extend({

  init: function() {
    this._super();
    this.set("controller", App.SliderController.create());
  },

  didInsertElement: function() {
    this.$().find('input').slider();
    // console.log();
  }

  // slide: function(evt) {
  //   alert("ClickableView was clicked!");
  // }
});