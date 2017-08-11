import { Rule } from "../parser";

const re = new RegExp(
  "^" +
    // look for stuff inside brackets [...]
    "\\[([^\\]]+)\\]" +
    // look for stuff inside parens (...)
    "\\(([^\\)]+)\\)",
);

export default <Rule>{
  order: -1,
  match: (s, { inline }) => (inline ? re.exec(s) : null),
  parse: (capture, parse, state) => ({
    type: "link",
    href: capture[2],
    content: parse(capture[1], { ...state, inline: true }),
  }),
};
