import { newParser } from "./parser";
import { newPrinter } from "./printer";
import { html } from "./printers";
import { defaultRules } from "./rules";
export { newParser, defaultRules };
export { newPrinter };

export const defaultParser = newParser(defaultRules);
export const defaultHTMLPrinter = newPrinter(html);

/*
const p = newParser(defaultRules);
const s = "* A\n- B\n\n";
console.log(p(s));
var require: any;
const m = require("./simple.js");
console.log(JSON.stringify(m.defaultParse(s), null, 2));

// import list from "./rules/list";
// console.log(list.match(s, { inline: false }, ""));

const t = p(s);
console.log(JSON.stringify(t, null, 2));
*/
