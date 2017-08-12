import { Rule } from "../parser";

const re = new RegExp(
  "^\\!" +
    // look for stuff inside brackets [...]
    "\\[([^\\]]+)?\\]" +
    // look for stuff inside parens (...)
    "\\(" +
    // look for url
    '([^\\)"]+)?' +
    // look for an optional title
    '\\s*(?:"([^"])")?' +
    // end parens
    "\\)",
);

export default <Rule>{
  order: 17,
  match: (s, { inline }) => (inline ? re.exec(s) : null),
  parse: capture => ({
    type: "image",
    alt: capture[1],
    target: capture[2],
    title: capture[3],
  }),
};
