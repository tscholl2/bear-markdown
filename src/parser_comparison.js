// parser
const p = require("./bundle.js");
function Parse(s) {
  return p.defaultHTMLPrinter(p.defaultParser(s));
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
  return markdown.toHTML(s, "Maruku");
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

console.log("PARSE");
console.log(JSON.stringify(Parse(s)));
console.log("MARKED");
console.log(JSON.stringify(MarkedParse(s)));
console.log("SIMPLE");
console.log(JSON.stringify(SimpleMarkdownParse(s)));
console.log("MARKDOWN");
console.log(
  JSON.stringify(
    MarkdownParse(`

# header

This is an *image* ![alt](url)

This is a [_link_](url)

* This
* is
* a
* list

Vessel     | Captain
-----------|-------------
NCC-1701   | James T Kirk
NCC-1701 A | James T Kirk
NCC-1701 D | Picard


`),
  ),
);
console.log("SHOWDOWN");
console.log(
  JSON.stringify(
    ShowDownParse(`

# header

This is an *image* ![alt](url)

This is a [_link_](url)

* This
* is
* a
* list

<table><thead><th \"align\"=\"center\">Tables</th><th \"align\"=\"center\">Are</th><th \"align\"=\"right\">Cool</th></thead><tbody><tr><td>col 3 is</td><td>right-aligned</td><td>$1600</td></tr><tr><td>col 2 is</td><td>centered</td><td>$12</td></tr><tr><td>zebra stripes</td><td>are neat</td><td>$1</td></tr></tbody></table>

`),
  ),
);
console.log("MICRO");
console.log(
  JSON.stringify(
    MicroMarkdownParse(`
# header

This is an *image* ![alt](url)

This is a [_link_](url)

* This
* is
* a
* list

this | *left* | center   | right
-----|:-------|:--------:|------:
with | sample | content  | for
lorem| ipsum  | dolor    | sit
sit  | amet   | sed      | do
do   | eiusom | tempor   | with


`),
  ),
);
console.log("COMMONMARK");
console.log(
  JSON.stringify(
    CommonmarkParse(`

# header

This is an *image* ![alt](url)

This is a [_link_](url)

* This
* is
* a
* list

<table><thead><th \"align\"=\"center\">Tables</th><th \"align\"=\"center\">Are</th><th \"align\"=\"right\">Cool</th></thead><tbody><tr><td>col 3 is</td><td>right-aligned</td><td>$1600</td></tr><tr><td>col 2 is</td><td>centered</td><td>$12</td></tr><tr><td>zebra stripes</td><td>are neat</td><td>$1</td></tr></tbody></table>

`),
  ),
);
