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
  match: s => re.exec(s),
  parse: capture => ({ tag: "comment", props: { content: capture[1] } }),
};
