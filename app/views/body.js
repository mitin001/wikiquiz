import template from 'templates/body';

export default Marionette.View.extend({
  template,
  regions: {
    content: '#content'
  }
});
