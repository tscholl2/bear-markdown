import * as Benchmark from "benchmark";
import { defaultParser, defaultHTMLPrinter } from "../src/index";
declare const require: any;

// this
const parse = (s: string) => defaultHTMLPrinter(defaultParser(s));
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
# header

This is an *image* ![alt](url)

This is a [_link_](url)

* This
* is
* a
* list

| this | is a |
| --- | --- |
| a | table |

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
  // add listeners
  .on("cycle", (event: any) => {
    console.log(String(event.target));
  })
  // run async
  .run({ async: false });
