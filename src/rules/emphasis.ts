import { Rule } from "../parser";

const re = new RegExp(
  "^" +
    // delimters are __, **, ~~, _, *, or ~
    "(__|\\*\\*|~~|_|\\*|~)" +
    // match until the next matching delimiter
    // note: we also include escaped delimiters e.g. \* or \~
    // note note: we don't need to replace these because
    // the match is parsed so they will be escaped properly
    "((?:\\\\\\1|[^(?:\\1)])*)?" +
    "\\1",
);

export default <Rule>{
  order: 23,
  match: (s, { inline }) => (inline ? re.exec(s) : null),
  parse: (capture, parse, state) => ({
    type: "emphasis",
    delimiter: capture[1],
    children: parse(capture[2], state),
  }),
};
