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
    '\\s*(?:"([^"]+)")?' +
    // end parens
    "\\)",
);

export default <Rule>{
  match: (s, { inline }) => (inline ? re.exec(s) : undefined),
  parse: capture => ({
    type: "image",
    props: {
      alt: (capture[1] || "").trim(),
      src: (capture[2] || "").trim(),
      title: (capture[3] || "").trim(), // TODO remove if absent
    },
  }),
};
