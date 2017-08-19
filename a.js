// parser
const p = require("./bundle.js");
function Parse(s) {
  return p.defaultHTMLPrinter(p.defaultParser(s))
}

// marked
const marked = require("marked");
function MarkedParse(s) {
  return marked(s);
}
// simple markdown
const SimpleMarkdown = require("simple-markdown");
const rules = SimpleMarkdown.defaultRules;
const parser = SimpleMarkdown.parserFor(rules);
const htmlOutput = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, "html"));
const SimpleMarkdownParse = function(source) {
  const blockSource = source + "\n\n";
  const parseTree = parser(blockSource, { inline: false });
  const outputResult = htmlOutput(parseTree);
  return outputResult;
};
// markdown
const markdown = require("markdown").markdown;
function MarkdownParse(s) {
  return markdown.toHTML(s);
}
// showdown
const showdown = require("showdown");
const converter = new showdown.Converter();
function ShowDownParse(s) {
  return converter.makeHtml(s);
}
// micromarkdown
const mmd = require("micromarkdown");
function MicroMarkdownParse(s) {
  return mmd.parse(s);
}
// commonmark
const commonmark = require("commonmark");
const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();
function CommonmarkParse(s) {
  const parsed = reader.parse(s); // parsed is a 'Node' tree
  // transform parsed if you like...
  const result = writer.render(parsed); // result is a String
  return result;
}

const s = `
# header

This is an *image* ![alt](url)

This is a [_link_](url)

* This
* is
* a
* list

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | \\$1600 |
| col 2 is      | centered      |   \\$12 |
| zebra stripes | are neat      |    \\$1 |

`;

console.log("PARSE")
console.log(JSON.stringify(Parse(s)));
console.log("MARKED")
console.log(JSON.stringify(MarkedParse(s)));
console.log("SIMPLE")
console.log(JSON.stringify(SimpleMarkdownParse(s)));
console.log("MARKDOWN")
console.log(JSON.stringify(MarkdownParse(s)));
console.log("SHOWDOWN")
console.log(JSON.stringify(ShowDownParse(s)));
console.log("MICRO")
console.log(JSON.stringify(MicroMarkdownParse(s)));
console.log("COMMONMARK")
console.log(JSON.stringify(CommonmarkParse(s)));
