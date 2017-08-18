import { Rule } from "../parser";

const re = new RegExp(
  "^" +
    // look for stuff inside brackets [...]
    "\\[([^\\]]+)\\]" +
    // look for stuff inside parens (...)
    "\\(([^\\)]+)\\)",
);

export default <Rule>{
  match: (s, { inline }) => (inline ? re.exec(s) : null),
  parse: (capture, parse, state) => ({
    tag: "link",
    props: { href: capture[2] },
    children: parse(capture[1], { ...state, inline: true }),
  }),
};
