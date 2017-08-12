import { Rule } from "../parser";

const re = new RegExp(
  "^" +
    "```" +
    // match anything between ```'s greedy so stops at first ```
    "([\\s\\S]+)?" +
    "```",
);

export default <Rule>{
  order: 24,
  match: (s, { inline }) => (inline ? null : re.exec(s)),
  parse: capture => ({
    type: "codeBlock",
    content: capture[1],
  }),
};
