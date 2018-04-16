import template from 'templates/quiz-content/paragraph-list';

export default Marionette.View.extend({
  template,
  events: {
    "click .paragraph-link": "selectParagraph"
  },
  selectParagraph(e) {
    let index = $(e.target).closest("[data-paragraph-index]").attr("data-paragraph-index");
    this.trigger("show:paragraph", index);
  }
});
