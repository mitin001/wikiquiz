export default class Paragraphs {
  constructor(title, html, getHeading) {
    this.initializeParagraphs();
    this.initializeBreadcrumbs(title);

    if (typeof getHeading === "function") this.initializeGetHeading(getHeading);
    else this.initializeGetHeading(() => null);

    this.processHTML(html);
  }
  initializeGetHeading(getHeading) {
    this.getHeading = getHeading;
  }
  initializeParagraphs() {
    this.paragraphs = [];
  }
  initializeBreadcrumbs(title) {
    this.breadcrumbs = [title];
    this.bhMap = [0];
  }
  pushHeading(hIndex, heading) {
    let headingPushed = false;
    let breadcrumbs = [];
    this.bhMap.forEach((bhIndex, bIndex) => {
      if (bhIndex < hIndex) return breadcrumbs.push(this.breadcrumbs[bIndex]);
      if (bhIndex === hIndex) {
        headingPushed = true;
        return breadcrumbs.push(heading);
      }
    });
    if ( ! headingPushed) {
      this.bhMap.push(hIndex);
      breadcrumbs.push(heading);
    }
    this.breadcrumbs = breadcrumbs;
  }
  pushParagraph(html) {
    if (this.breadcrumbs === this.tempBreadcrumbs) this.counter += 1;
    else this.counter = 1;
    this.paragraphs.push({breadcrumbs: this.breadcrumbs, counter: this.counter, html});
    this.tempBreadcrumbs = this.breadcrumbs;
  }
  processHTML(html) {
    $(html).find("p, h1, h2, h3, h4, h5, h6").each((idx, el) => {
      this.processTypographicElement(el.tagName, el.outerHTML)
    });
  }
  processTypographicElement(tag, html) {
    if (tag === "P") {
      if (html) this.pushParagraph(html);
      return;
    }
    this.processHeading(tag, html);
  }
  processHeading(tag, html) {
    let heading = this.getHeading(html);
    let matches = /H([1-6])/.exec(tag);
    if (matches && matches[1] && heading) this.pushHeading(parseInt(matches[1]), heading);
  }
  getHeading(html) {
    return this.getHeading(html);
  }
  getParagraphs() {
    return this.paragraphs;
  }
}
