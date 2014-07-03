App.AudienceController = Ember.ObjectController.extend({
  collapseRef: function() {
    var id = this.get('model').get('id');
    return "#collapse-" + id;
  }.property(),

  collapseId: function() {
    var id = this.get('model').get('id');
    return "collapse-" + id;
  }.property(),

  getSliderValue: function() {
    var min = this.get('min'),
        max = this.get('max');
    console.log("getSliderValue");
    return "[" + min + "," + max + "]";
  }
});