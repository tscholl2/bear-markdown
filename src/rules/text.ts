import { Rule } from "../parser";

export default <Rule>{
  order: 26,
  match: (s, { inline }) =>
    inline ? /^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/.exec(s) : null,
  parse: capture => ({
    type: "text",
    content: capture[0],
  }),
};
