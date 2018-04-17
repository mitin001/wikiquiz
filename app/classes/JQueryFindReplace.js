export default class JQueryFindReplace {

  constructor(html, find, replace) {

    this.initializeReplacedElements();

    if (typeof html === "string") this.setHTML(html);
    else this.setHTML("");

    if (typeof find === "function") this.setFind(find);
    else this.setFind(() => $(""));

    if (typeof replace === "function") this.setReplace(replace);
    else this.setReplace(() => "");

    this.processHTML(html);
  }
  initializeReplacedElements() {
    this.replacedElements = [];
  }
  setFind(find) {
    this.find = find;
  }
  setReplace(replace) {
    this.replace = replace;
  }
  setHTML(html) {
    this.html = html;
  }
  pushReplacedElement(replacedElement, index) {
    if (index) this.replacedElements[index] = replacedElement;
    else this.replacedElements.push(replacedElement);
  }
  processHTML(html) {
    this.find(html).each((index, el) => this.processElement(index, el));
  }
  processElement(index, el) {
    let replacedElement = el.outerHTML;
    let replacementElement = this.replace(index, $(el));
    let html = this.html.replace(replacedElement, replacementElement);
    this.setHTML(html);
    this.pushReplacedElement(replacedElement, index);
  }
  getHTML() {
    return this.html;
  }
  getReplacedElements() {
    return this.replacedElements;
  }
}
