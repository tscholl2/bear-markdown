import { Rule } from "../parser";

const re = new RegExp(
  "^" +
    // delimters are __, **, ~~, _, *, or ~
    "(__|\\*\\*|~~|_|\\*|~)" +
    // match until the next matching delimiter
    "([^(?:\\1)]*)?" +
    "\\1",
);

export default <Rule>{
  order: 23,
  match: (s, { inline }) => (inline ? re.exec(s) : null),
  parse: (capture, parse, state) => ({
    type: "emphasis",
    delimiter: capture[1],
    content: parse(capture[2], state),
  }),
};
