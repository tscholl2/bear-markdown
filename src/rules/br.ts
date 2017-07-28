import { Rule } from "../parser";

export default <Rule>{
  order: 25,
  match: s => /^ {2,}\n/.exec(s),
  parse: () => ({ type: "br" }),
};
