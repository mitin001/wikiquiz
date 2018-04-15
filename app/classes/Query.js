export default class Query {
  constructor(str) {
    this.initializeAttributes();
    if (typeof str === "string") this.processQuery(str);
  }
  initializeAttributes() {
    this.attributes = {};
  }
  pushAttribute(name, value) {
    this.attributes[name] = value;
  }
  getAttributes() {
    return this.attributes;
  }
  processQuery(str) {
    str.split("&").forEach(parameter => this.processParameter(parameter));
  }
  processParameter(parameter) {
    let bundle = parameter.split("=");
    if (bundle[0] && bundle[1]) this.pushAttribute(bundle[0], bundle[1]);
  }
}
