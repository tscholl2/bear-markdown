import { newParser, Node } from "./parser";
import { printHTML } from "./html-printer";
import { defaultRules } from "./rules";
export { printHTML } from "./html-printer";
export { newParser, defaultRules };
export const defaultParser: (markdown: string) => Node[] = newParser(defaultRules);

const p = newParser(defaultRules);
const s = `# header

![image](url)

some text

1. a
2. b
3. c

this is a [link](url)

this is an ![image](url)`;
console.log(printHTML(p(s)));
/*
var require: any;
const m = require("./simple.js");
console.log(JSON.stringify(m.defaultParse(s), null, 2));

// import list from "./rules/list";
// console.log(list.match(s, { inline: false }, ""));

const t = p(s);
console.log(JSON.stringify(t, null, 2));
*/
