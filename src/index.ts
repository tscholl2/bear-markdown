import { newParser } from "./parser";
import { defaultRules } from "./rules";
export { newParser, defaultRules };
export const defaultParser = newParser(defaultRules);

const p = newParser(defaultRules);
const s = `* 1
  - a
`;
/*
var require: any;
const m = require("./simple.js");
console.log(JSON.stringify(m.defaultParse(s), null, 2));

// import list from "./rules/list";
// console.log(list.match(s, { inline: false }, ""));

*/
const t = p(s);
console.log(JSON.stringify(t, null, 2));
