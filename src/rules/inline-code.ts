import { Rule } from "../parser";

const re = new RegExp(
  "^" +
    "`" +
    // match anything between `'s greedy so stops at first *
    // note: we include escaped `'s as well
    "((?:[\\s\\S]|\\\\`)+)" +
    "`",
);

export default <Rule>{
  order: 24,
  match: (s, { inline }) => (inline ? re.exec(s) : null),
  parse: capture => ({
    type: "inlineCode",
    content: capture[1].replace("\\`", "`"),
  }),
};
