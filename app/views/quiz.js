import template from 'templates/quiz';
import Quiz from 'views/quiz-content';
import Wikipedia from 'models/wikipedia';

export default Marionette.View.extend({
  template,
  regions: {
    content: "#quiz-content"
  },
  onAttach() {
    this.getPage(this.options.page, model => this.processPage(model));
  },
  getPage(page, success) {
    let data = {page};
    let wiki = new Wikipedia();
    wiki.fetch({data, success});
  },
  processPage(model) {
    this.showChildView("content", new Quiz({model}));
  }
});
