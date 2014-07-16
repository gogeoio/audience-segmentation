App.PanelController = Ember.ArrayController.extend({
  first: false,

  isFirst: function(key, value) {
    var first = this.get('first');
    if(first) {
      this.set('first', false);
      return true;
    }
    else return false;
  }.property(),
});