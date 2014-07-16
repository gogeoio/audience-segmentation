App.PanelView = Ember.View.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, function(){
      // perform your jQuery logic here
    $( ".panel-default" ).wrapAll( "<div class='panel-group' id='accordion'>");
    });
  },
});