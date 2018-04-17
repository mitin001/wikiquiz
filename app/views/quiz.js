import template from 'templates/quiz';

import Wikipedia from 'models/wikipedia';
import BlankAnchors from 'models/blank-anchors';

import ParagraphList from 'views/quiz-content/paragraph-list';
import Paragraph from 'views/quiz-content/paragraph';

export default Marionette.View.extend({
  template,
  regions: {
    content: "#quiz-content"
  },
  childViewEvents: {
    "show:paragraph": "showParagraph"
  },
  onAttach() {
    this.getPage(this.options.page, model => {
      this.setModel(model);
      this.showParagraphList(model)
    });
  },
  setModel(model) {
    this.model = model;
  },
  getPage(page, success) {
    let data = {page};
    let wiki = new Wikipedia();
    wiki.fetch({data, success});
  },
  showParagraphList() {
    this.showChildView("content", new ParagraphList({model: this.model}));
  },
  showParagraph(index) {
    let paragraphs = this.model.get("paragraphs");
    let paragraph = Array.isArray(paragraphs) ? paragraphs[index] : {};
    let model = new BlankAnchors(paragraph, {parse: true});
    this.showChildView("content", new Paragraph({model}));
  }
});
