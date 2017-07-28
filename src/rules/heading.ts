import { Rule } from "../parser";

export default <Rule>{
  order: 0,
  match: (s, { inline }) =>
    inline ? undefined : /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n *)+\n/.exec(s),
  parse: (capture, parse, state = {}) => ({
    type: "heading",
    level: capture[1].length,
    content: parse(capture[2], { ...state, inline: true }),
  }),
};
