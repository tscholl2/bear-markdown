import { newParser } from "./parser";
import { defaultRules } from "./rules2";
export { newParser, defaultRules };
export const defaultParser = newParser(defaultRules);

const p = newParser(defaultRules);
const s = `* a
* b`;
/*
var require: any;
const m = require("./simple.js");
console.log(JSON.stringify(m.defaultParse(s), null, 2));

// import list from "./rules/list";
// console.log(list.match(s, { inline: false }, ""));

*/
const t = p(s);
console.log(JSON.stringify(t, null, 2));
