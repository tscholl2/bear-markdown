import { newParser } from "./parser";
import { newPrinter } from "./printer";
import { html } from "./printers";
import { defaultRules } from "./rules";
export { newParser, defaultRules };
// export { newPrinter };

export const defaultParser = newParser(defaultRules);
export const defaultHTMLPrinter = newPrinter(html);

/*
console.log(defaultHTMLPrinter(defaultParser("hi")));
const p = newParser(defaultRules);
const s = "$$1+1$$";
console.log(JSON.stringify(p(s)));
var require: any;
const m = require("./simple.js");
console.log(JSON.stringify(m.defaultParse(s), null, 2));

// import list from "./rules/list";
// console.log(list.match(s, { inline: false }, ""));

const t = p(s);
console.log(JSON.stringify(t, null, 2));
*/
