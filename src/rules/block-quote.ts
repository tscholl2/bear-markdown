import { Rule } from "../parser";

const re = new RegExp(
  "^(" +
    // any amount of space and a >
    "\\s*>" +
    // match any non-newlines
    "[^\\n]*" +
    // find all lines like this
    ")+" +
    // repeat until a newline or end
    "(\\n|$)",
);

export default <Rule>{
  match: (s, { inline }) => (inline ? undefined : re.exec(s)),
  parse: (capture, parse, state) => ({
    type: "blockquote",
    // parse by replacing the initial ">" in front of lines
    children: parse(capture[0].replace(/^\s*> ?/gm, ""), state),
  }),
};
