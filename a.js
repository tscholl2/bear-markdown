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
const s = `
| A | B |
| - | - |
| c | d |
`;

console.log(JSON.stringify(MarkedParse(s)));
console.log(JSON.stringify(SimpleMarkdownParse(s)));
console.log(JSON.stringify(MarkdownParse(s)));
console.log(JSON.stringify(ShowDownParse(s)));
console.log(JSON.stringify(MicroMarkdownParse(s)));
