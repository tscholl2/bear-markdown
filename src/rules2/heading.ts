import { Rule } from "../parser";

const re = new RegExp(
  "^" +
    // look for between 1 and 6 #'s
    "#{1,6}\\s*" +
    // then any characters
    "([\\s\\S]*)" +
    // until the end of the line, which may have some #'s also
    "(\\s*#*\\s*)?$",
);

export default <Rule>{
  order: 0,
  match: (s, { inline }) => (inline ? undefined : re.exec(s)),
  parse: (capture, parse, state = {}) => ({
    type: "heading",
    level: capture[1].length,
    content: parse(capture[2], { ...state, inline: true }),
  }),
};
