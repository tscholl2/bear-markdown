import { Rule } from "../parser";

export default <Rule>{
  order: 24,
  match: (s, { inline }) => (inline ? /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/.exec(s) : null),
  parse: capture => ({
    type: "inlineCode",
    content: capture[2],
  }),
};
