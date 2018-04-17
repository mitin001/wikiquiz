import JQueryFindReplace from "classes/JQueryFindReplace";

const find = html => $(html).find("a");
const replace = (index, $el) => {
  if ($el.parent().prop("tagName") === "SUP") return "";
  return `<input data-anchor-index="${index}">`;
};

// replace anchors in HTML with blank inputs
export default Backbone.Model.extend({
  parse(data) {
    let html = data.html;
    let counter = data.counter;
    let breadcrumbs = data.breadcrumbs;
    let processor = new JQueryFindReplace(html, find, replace);
    let p = processor.getHTML();
    let a = processor.getReplacedElements();
    return {
      p, // html with <a> tags and replaced them with <input data-anchor-index="idx"> tags and <sup><a></sup> tags removed
      a, // array of replaced <a> tags, mapped to <input> tags in string p with index idx
      breadcrumbs,
      counter
    };
  }
});
