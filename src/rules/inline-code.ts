import { Rule } from "../parser";

const re = new RegExp(
  "^" +
    "`" +
    // match anything between "`"s greedy so stops at first *
    // note: we include escaped "`"s as well so it doesn't end early
    "((?:[\\s\\S]|\\\\`)+)" +
    "`",
);

export default <Rule>{
  match: (s, { inline }) => (inline ? re.exec(s) : null),
  parse: capture => ({
    tag: "code",
    // we replace escaped "`"s to allow for using "`"s inside inline code
    children: [capture[1].replace("\\`", "`")],
  }),
};
