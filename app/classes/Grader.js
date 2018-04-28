const normalize = title => title.trim().toLowerCase();
const isMatch = (a, b) => normalize(a) === normalize(b);

export default class Grader {
  constructor(anchors, answers) {
    if (Array.isArray(anchors)) this.setAnchors(anchors);
    else this.setAnchors([]);

    if (Array.isArray(answers)) this.setAnswers(answers);
    else this.setAnswers([]);

    this.processAnswers();
  }
  initializeTuples() {
    this.tuples = [];
  }
  initializeMatches() {
    this.matches = [];
  }
  initializeAmbiguities() {
    this.ambiguities = [];
  }
  setAnchors(anchors) {
    this.anchors = anchors;
  }
  setAnswers(answers) {
    this.answers = answers;
  }
  pushMatch(match) {
    this.matches.push(match);
  }
  pushTuple(tuple) {
    this.tuples.push(tuple);
  }
  pushAmbiguity(ambiguity) {
    this.ambiguities.push(ambiguity);
  }
  processAnswers() {
    this.initializeTuples();
    this.initializeMatches();
    this.initializeAmbiguities();
    this.answers.forEach(answer => this.processTuple(answer.index, answer.value));
  }
  processTuple(index, answer) {
    let anchor = this.anchors[index];
    let $anchor = $(anchor);
    let text = $anchor.text();
    let href = $anchor.attr("href");
    let title = $anchor.attr("title");
    let tuple = {href, title, text, answer, index};

    if (isMatch(answer, text) || isMatch(answer, title)) {
      tuple.match = true;
      this.pushMatch(tuple);
    }
    else {
      this.pushTuple(tuple);
      this.pushAmbiguity(answer);
      this.pushAmbiguity(title);
    }
  }
  getTuples() {
    return this.tuples;
  }
  getMatches() {
    return this.matches;
  }
  getAmbiguities() {
    return this.ambiguities;
  }
}
