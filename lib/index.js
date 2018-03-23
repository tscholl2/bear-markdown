"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./parser");
exports.newParser = parser_1.newParser;
var printer_1 = require("./printer");
exports.newPrinter = printer_1.newPrinter;
exports.newNodePrinters = printer_1.newNodePrinters;
var rules_1 = require("./rules");
exports.defaultRules = rules_1.defaultRules;
exports.defaultParser = parser_1.newParser(rules_1.defaultRules);
exports.defaultHTMLPrinter = printer_1.newPrinter(printer_1.newNodePrinters(function (tag, attr, children) {
    if (attr === void 0) { attr = {}; }
    if (children === void 0) { children = []; }
    var a = "";
    for (var key in attr) {
        if (key != "id") {
            a += " \"" + key + "\"=\"" + attr[key] + "\"";
        }
    }
    return "<" + tag + a + ">" + children.join("") + "</" + tag + ">";
}));
