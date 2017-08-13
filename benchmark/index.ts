import * as Benchmark from "benchmark";
import { defaultParser as parse } from "../src/index";
declare const require: any;

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

![alt](http://url)

This is a paragraph

* This
* is
* a
* list
`;

new (Benchmark as any).Suite()
  .add("parser", () => {
    parse(s);
  })
  .add("marked", () => {
    MarkedParse(s);
  })
  .add("simple markdown", () => {
    SimpleMarkdownParse(s);
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
