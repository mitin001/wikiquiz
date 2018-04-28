import template from 'templates/quiz-content/paragraph';
import Grader from 'classes/Grader';
import Redirects from 'models/wikipedia/redirects';
import Result from 'views/quiz-content/result';

export default Marionette.View.extend({
  template,
  regions: {
    result: "#quiz-result"
  },
  events: {
    "click .quiz-submit": "grade"
  },
  grade() {
    let anchors = this.model.get("a");
    let answers = this.$el.find("input[data-anchor-index]").map((idx, el) => this.processInput($(el))).toArray();
    let grader = new Grader(anchors, answers);
    let tuples = grader.getTuples();
    let matches = grader.getMatches();
    let ambiguities = grader.getAmbiguities();
    if (ambiguities) this.resolveRedirects(ambiguities.join("|"), model => this.match(model, tuples, matches));
    else this.showResult(matches);
  },
  processInput($el) {
    return {
      index: parseInt($el.attr("data-anchor-index")),
      value: $el.val()
    };
  },
  resolveRedirects(titles, success) {
    let data = {titles};
    let redirects = new Redirects();
    redirects.fetch({data, success});
  },
  match(model, tuples, matches) {
    tuples.forEach(tuple => matches.push(model.match(tuple)));
    this.showResult(matches);
  },
  showResult(matches) {
    let model = new Backbone.Model({matches}); // TODO: convert matches into its own Backbone Collection where id of each model is index
    this.showChildView("result", new Result({model}));
  }
});
