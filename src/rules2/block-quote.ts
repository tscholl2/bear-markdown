import { Rule } from "../parser";

const re = new RegExp(
  "^(" +
    // any amount of space and a >
    "\\s*>" +
    // match any non-newlines
    "[^\\n]*" +
    // find all lines like this
    ")+" +
    // until a newline
    "\\n",
);

export default <Rule>{
  order: 6,
  match: (s, { inline }) => (inline ? undefined : re.exec(s)),
  parse: (capture, parse, state) => ({
    type: "blockQuote",
    // parse by replacing the initial ">" in front of lines
    content: parse(capture[0].replace(/^ *> ?/gm, ""), state),
  }),
};
