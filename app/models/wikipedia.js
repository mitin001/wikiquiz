// get HTML of a Wikipedia page

export default Backbone.Model.extend({
  url: "https://en.wikipedia.org/w/api.php?action=parse&redirects&prop=text&format=json&origin=*",
  parse(data) {
    let parse = data.parse || {};
    let title = parse.title;
    let pageid = parse.pageid;
    let redirects = parse.redirects || [];
    let redirect = redirects[0] || {};
    let queried_title = redirect.from;
    let fragment = redirect.tofragment;
    let text = parse.text || {};
    let html = text["*"];
    return {
      title, // title of the retrieved page
      pageid, // pageid of the retrieved page
      queried_title, // if redirected, title != queried_title
      fragment, // if redirected to a fragment, this is defined
      html // HTML of the queried page; the redirect was followed; if redirected to a fragment, this is still HTML of the entire page
    };
  }
});
