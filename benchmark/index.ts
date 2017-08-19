import * as Benchmark from "benchmark";
import { defaultParser, defaultHTMLPrinter } from "../src/index";
declare const require: any;

// this
const parse = (s: string) => {
  // return defaultParser(s)
  return defaultHTMLPrinter(defaultParser(s));
};
// simple markdown
const SimpleMarkdown = require("simple-markdown");
const rules = SimpleMarkdown.defaultRules;
const parser = SimpleMarkdown.parserFor(rules);
const htmlOutput = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, "html"));
const SimpleMarkdownParse = function(source) {
  /*
  return SimpleMarkdown.defaultParse(source+"\n\n")
  */
  const blockSource = source + "\n\n";
  const parseTree = parser(blockSource, { inline: false });
  const outputResult = htmlOutput(parseTree);
  return outputResult;
};
// marked
const marked = require("marked");
function MarkedParse(s: string) {
  return marked(s);
}
// markdown
const markdown = require("markdown").markdown;
function MarkdownParse(s: string) {
  return markdown.toHTML(s);
}
// showdown
const showdown = require("showdown");
const converter = new showdown.Converter();
function ShowDownParse(s: string) {
  return converter.makeHtml(s);
}
// micromarkdown
const mmd = require("micromarkdown");
function MicroMarkdownParse(s: string) {
  return mmd.parse(s);
}
// commonmark
const commonmark = require("commonmark");
const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();
function CommonmarkParse(s: string) {
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

new (Benchmark as any).Suite()
  .add("parser", () => {
    parse(s);
  })
  .add("simple markdown", () => {
    SimpleMarkdownParse(s);
  })
  .add("marked", () => {
    MarkedParse(s);
  })
  .add("markdown", () => {
    MarkdownParse(s);
  })
  .add("showdown", () => {
    ShowDownParse(s);
  })
  .add("micromarkdown", () => {
    MicroMarkdownParse(s);
  })
  .add("commonmark", () => {
    CommonmarkParse(s);
  })
  // add listeners
  .on("cycle", (event: any) => {
    console.log(String(event.target));
  })
  // run async
  .run({ async: false });
