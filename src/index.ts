import { newParser } from "./parser";
import { newPrinter } from "./printer";
import { html } from "./printers";
import { defaultRules } from "./rules";
export { newParser, defaultRules };
export { newPrinter };

export const defaultParser = newParser(defaultRules);
export const defaultHTMLPrinter = newPrinter(html);

const p = newParser(defaultRules);
const s = `# header

![image](url)

some text

1. a
2. b
3. c

this is a [link](url)

this is an ![image](url)`;
console.log(defaultHTMLPrinter(p(s)));
/*
var require: any;
const m = require("./simple.js");
console.log(JSON.stringify(m.defaultParse(s), null, 2));

// import list from "./rules/list";
// console.log(list.match(s, { inline: false }, ""));

const t = p(s);
console.log(JSON.stringify(t, null, 2));
*/
