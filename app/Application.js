import AppRouter from 'AppRouter';
import Body from 'views/body';

export default Marionette.Application.extend({
  region: '#app',
  onBeforeStart() {
    new AppRouter();
  },
  onStart() {
    this.showView(new Body());
    Backbone.history.start({
      pushState: true
    });
  }
});
