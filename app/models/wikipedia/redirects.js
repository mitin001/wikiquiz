// resolve redirects of Wikipedia pages to pageids
export default Backbone.Model.extend({
  url: "https://en.wikipedia.org/w/api.php?action=query&redirects&format=json&formatversion=2&origin=*",
  normalize(title) { return title.trim().toLowerCase(); },
  getRoot(key, sample) {
    let last = key;
    while(key = sample[key]) { last = key; }
    return last;
  },
  match(tuple) {
    if (tuple.match) return tuple;
    tuple.match = this.pageids[this.normalize(tuple.title)] === this.pageids[this.normalize(tuple.answer)];
    return tuple;
  },
  parse(data) {
    let forest = {};
    let query = data.query;
    let norms = query.normalized;
    let redirects = query.redirects;
    let pages = query.pages;
    norms.forEach(norm => {
      let from = this.normalize(norm.from);
      forest[from] = this.normalize(norm.to);
    });
    redirects.forEach(redirect => {
      let from = this.normalize(redirect.from);
      forest[from] = this.normalize(redirect.to);
    });
    pages.forEach(page => {
      let title = this.normalize(page.title);
      forest[title] = page.pageid;
    });
    this.pageids = _.mapObject(forest, (value, key) => this.getRoot(key, forest));
    return {query};
  }
});
