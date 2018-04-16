export default class Paragraphs {
  constructor(title, html, getHeading) {
    this.initializeParagraphs();
    this.setTitle(title);
    this.processHTML(html, getHeading);
  }
  initializeParagraphs() {
    this.paragraphs = [];
  }
  setTitle(value) {
    this.title = value;
    this.breadcrumbs = [this.title];
  }
  setH2(value) {
    this.h2 = value;
    this.breadcrumbs = [this.title, this.h2];
  }
  setH3(value) {
    this.h3 = value;
    this.breadcrumbs = [this.title, this.h2, this.h3];
  }
  setH4(value) {
    this.h4 = value;
    this.breadcrumbs = [this.title, this.h2, this.h3, this.h4];
  }
  setH5(value) {
    this.h5 = value;
    this.breadcrumbs = [this.title, this.h2, this.h3, this.h4, this.h5];
  }
  setH6(value) {
    this.h6 = value;
    this.breadcrumbs = [this.title, this.h2, this.h3, this.h4, this.h5, this.h6];
  }
  setHeading(tag, heading) { // TODO: consolidate all setH* functions into this function
    switch(tag) {
      case "H2": if (heading) this.setH2(heading); break;
      case "H3": if (heading) this.setH3(heading); break;
      case "H4": if (heading) this.setH4(heading); break;
      case "H5": if (heading) this.setH5(heading); break;
      case "H6": if (heading) this.setH6(heading); break;
    }
  }
  pushParagraph(html) {
    if (this.breadcrumbs === this.tempBreadcrumbs) this.counter += 1;
    else this.counter = 1;
    this.paragraphs.push({breadcrumbs: this.breadcrumbs, counter: this.counter, html});
    this.tempBreadcrumbs = this.breadcrumbs;
  }
  processHTML(html, getHeading) {
    $(html).find("p, h2, h3, h4, h5, h6").each((idx, el) => {
      let tag = el.tagName;
      let outerHTML = el.outerHTML;
      if (tag === "P" && outerHTML) this.pushParagraph(outerHTML);
      else if (["H2", "H3", "H4", "H5", "H6"].indexOf(tag) !== -1) this.setHeading(tag, getHeading(outerHTML)); // TODO: regex-test H[2-6]
    });
  }
  getParagraphs() {
    return this.paragraphs;
  }
}
