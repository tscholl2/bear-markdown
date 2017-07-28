import { Rule } from "../parser";

export default <Rule>{
  order: 11,
  match: (s, { inline }) => (inline ? null : /^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/.exec(s)),
  parse: (capture, parse, state) => ({
    type: "paragraph",
    content: parse(capture[1], { ...state, inline: true }),
  }),
};
