"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./parser");
exports.newParser = parser_1.newParser;
var printer_1 = require("./printer");
exports.newPrinter = printer_1.newPrinter;
var printers_1 = require("./printers");
var rules_1 = require("./rules");
exports.defaultRules = rules_1.defaultRules;
exports.defaultParser = parser_1.newParser(rules_1.defaultRules);
exports.defaultHTMLPrinter = printer_1.newPrinter(printers_1.html);
var p = parser_1.newParser(rules_1.defaultRules);
var s = "# header\n\n![image](url)\n\nsome text\n\n1. a\n2. b\n3. c\n\nthis is a [link](url)\n\nthis is an ![image](url)";
console.log(exports.defaultHTMLPrinter(p(s)));
/*
var require: any;
const m = require("./simple.js");
console.log(JSON.stringify(m.defaultParse(s), null, 2));

// import list from "./rules/list";
// console.log(list.match(s, { inline: false }, ""));

const t = p(s);
console.log(JSON.stringify(t, null, 2));
*/
//# sourceMappingURL=index.js.map