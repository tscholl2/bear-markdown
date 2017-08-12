import { Rule } from "../parser";

const re = new RegExp(
  "^" +
    // match everything between <!-- and -->
    "<!--" +
    // will match until non-closing
    "[^(?:\\-\\->)]" +
    // closing -->
    "-->",
);

export default <Rule>{
  order: -1,
  match: s => re.exec(s),
  parse: capture => ({
    type: "comment",
    content: capture[1],
  }),
};
