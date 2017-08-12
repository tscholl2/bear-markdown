import * as Benchmark from "benchmark";
import { defaultParser as parse } from "../src/index";
declare const require: any;
const marked = require("marked");
const SimpleMarkdownParse = require("simple-markdown").defaultBlockParse;
const markdown = require("markdown").markdown;
var showdown = new require("showdown").Converter();
const mmd = require("micromarkdown");

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
    marked(s);
  })
  .add("simple markdown", () => {
    SimpleMarkdownParse(s);
  })
  .add("markdown", () => {
    markdown.toHTML(s);
  })
  .add("showdown", () => {
    showdown.makeHtml(s);
  })
  .add("micromarkdown", () => {
    mmd.parse(s);
  })
  // add listeners
  .on("cycle", (event: any) => {
    console.log(String(event.target));
  })
  // run async
  .run({ async: false });
