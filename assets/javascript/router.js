App.Router.map(function() {
  this.resource('panel', { path: '/' });
});

App.PanelRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('panel');
  }
});