import { Rule } from "../parser";

const re = new RegExp(
  "^" +
    "```" +
    // match anything between ```'s greedy so stops at first ```
    // note: we include escaped delimiters e.g. "\```"
    "((?:[\\s\\S]|\\\\```)+)?" +
    "```",
);

export default <Rule>{
  match: (s, { inline }) => (inline ? undefined : re.exec(s)),
  parse: capture => ({
    tag: "code",
    // replace any escaped delimiters
    props: { display: "block", content: capture[1].replace(/\\```/g, "```") },
  }),
};
