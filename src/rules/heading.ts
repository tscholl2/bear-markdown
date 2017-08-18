import { Rule } from "../parser";

const re = new RegExp(
  "^" +
    // look for between 1 and 6 #'s
    "(#{1,6})\\s*" +
    // then any characters
    "([^\\n]*)" +
    // until the end of the line, which may have some #'s also
    "(?:\\s*#*\\s*)?(?=\n|$)",
);

export default <Rule>{
  match: (s, { inline }) => (inline ? undefined : re.exec(s)),
  parse: (capture, parse, state = {}) => ({
    tag: "heading",
    props: { level: capture[1].length },
    children: parse(capture[2], { ...state, inline: true }),
  }),
};
