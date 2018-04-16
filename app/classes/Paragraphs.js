export default class Paragraphs {
  constructor(title, html, getHeading) {
    this.initializeParagraphs();
    this.initializeBreadcrumbs(title);
    this.processHTML(html, getHeading);
  }
  initializeParagraphs() {
    this.paragraphs = [];
  }
  initializeBreadcrumbs(title) {
    this.breadcrumbs = [title];
  }
  pushHeading(hIndex, heading) {
    let bIndex = parseInt(hIndex) - 1;
    let headingPushed = false;
    let breadcrumbs = [];
    this.breadcrumbs.forEach((crumb, idx) => {
      if (idx < bIndex) return breadcrumbs.push(crumb);
      if (idx === bIndex) {
        headingPushed = true;
        return breadcrumbs.push(heading);
      }
    });
    if ( ! headingPushed) breadcrumbs.push(heading);
    this.breadcrumbs = breadcrumbs;
  }
  pushParagraph(html) {
    if (this.breadcrumbs === this.tempBreadcrumbs) this.counter += 1;
    else this.counter = 1;
    this.paragraphs.push({breadcrumbs: this.breadcrumbs, counter: this.counter, html});
    this.tempBreadcrumbs = this.breadcrumbs;
  }
  processHTML(html, getHeading) {
    $(html).find("p, h2, h3, h4, h5, h6").each((idx, el) => {
      let matches;
      let heading;
      let tag = el.tagName;
      let outerHTML = el.outerHTML;
      if (tag === "P" && outerHTML) return this.pushParagraph(outerHTML);
      if ((matches = /H([1-6])/.exec(tag)) !== null && matches[1] && (heading = getHeading(outerHTML))) {
        this.pushHeading(matches[1], heading);
      }
    });
  }
  getParagraphs() {
    return this.paragraphs;
  }
}
