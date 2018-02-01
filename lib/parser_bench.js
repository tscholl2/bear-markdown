"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Benchmark = require("benchmark");
var index_1 = require("../src/index");
// this
var parse = function (s) {
    return index_1.defaultHTMLPrinter(index_1.defaultParser(s));
};
// simple markdown
var SimpleMarkdown = require("simple-markdown");
var rules = SimpleMarkdown.defaultRules;
var parser = SimpleMarkdown.parserFor(rules);
var htmlOutput = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, "html"));
var SimpleMarkdownParse = function (source) {
    var blockSource = source + "\n\n";
    var parseTree = parser(blockSource, { inline: false });
    var outputResult = htmlOutput(parseTree);
    return outputResult;
};
// marked
var marked = require("marked");
function MarkedParse(s) {
    return marked(s);
}
// markdown
var markdown = require("markdown").markdown;
function MarkdownParse(s) {
    return markdown.toHTML(s);
}
// showdown
var showdown = require("showdown");
var converter = new showdown.Converter();
function ShowDownParse(s) {
    return converter.makeHtml(s);
}
// micromarkdown
var mmd = require("micromarkdown");
function MicroMarkdownParse(s) {
    return mmd.parse(s);
}
// commonmark
var commonmark = require("commonmark");
var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();
function CommonmarkParse(s) {
    var parsed = reader.parse(s); // parsed is a 'Node' tree
    // transform parsed if you like...
    var result = writer.render(parsed); // result is a String
    return result;
}
var s = "\n# header\n\nThis is an *image* ![alt](url)\n\nThis is a [_link_](url)\n\n* This\n* is\n* a\n* list\n\n| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | \\$1600 |\n| col 2 is      | centered      |   \\$12 |\n| zebra stripes | are neat      |    \\$1 |\n\n";
new Benchmark.Suite()
    .add("parser", function () {
    parse(s);
})
    .add("simple markdown", function () {
    SimpleMarkdownParse(s);
})
    .add("marked", function () {
    MarkedParse(s);
})
    .add("markdown", function () {
    MarkdownParse("\n\n# header\n\nThis is an *image* ![alt](url)\n\nThis is a [_link_](url)\n\n* This\n* is\n* a\n* list\n\nVessel     | Captain\n-----------|-------------\nNCC-1701   | James T Kirk\nNCC-1701 A | James T Kirk\nNCC-1701 D | Picard\n\n\n");
})
    .add("showdown", function () {
    ShowDownParse("\n\n# header\n\nThis is an *image* ![alt](url)\n\nThis is a [_link_](url)\n\n* This\n* is\n* a\n* list\n\n<table><thead><th \"align\"=\"center\">Tables</th><th \"align\"=\"center\">Are</th><th \"align\"=\"right\">Cool</th></thead><tbody><tr><td>col 3 is</td><td>right-aligned</td><td>$1600</td></tr><tr><td>col 2 is</td><td>centered</td><td>$12</td></tr><tr><td>zebra stripes</td><td>are neat</td><td>$1</td></tr></tbody></table>\n\n");
})
    .add("micromarkdown", function () {
    MicroMarkdownParse("\n# header\n\nThis is an *image* ![alt](url)\n\nThis is a [_link_](url)\n\n* This\n* is\n* a\n* list\n\nthis | *left* | center   | right\n-----|:-------|:--------:|------:\nwith | sample | content  | for\nlorem| ipsum  | dolor    | sit\nsit  | amet   | sed      | do\ndo   | eiusom | tempor   | with\n\n\n");
})
    .add("commonmark", function () {
    CommonmarkParse("\n\n# header\n\nThis is an *image* ![alt](url)\n\nThis is a [_link_](url)\n\n* This\n* is\n* a\n* list\n\n<table><thead><th \"align\"=\"center\">Tables</th><th \"align\"=\"center\">Are</th><th \"align\"=\"right\">Cool</th></thead><tbody><tr><td>col 3 is</td><td>right-aligned</td><td>$1600</td></tr><tr><td>col 2 is</td><td>centered</td><td>$12</td></tr><tr><td>zebra stripes</td><td>are neat</td><td>$1</td></tr></tbody></table>\n\n");
})
    .on("cycle", function (event) {
    console.log(String(event.target));
})
    .run({ async: false });
