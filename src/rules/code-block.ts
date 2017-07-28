import { Rule } from "../parser";

export default <Rule>{
  order: 4,
  match: (s, { inline }) => (inline ? null : /^(?:    [^\n]+\n*)+(?:\n *)+\n/.exec(s)),
  parse: capture => ({
    type: "codeBlock",
    content: capture[0].replace(/^    /gm, "").replace(/\n+$/, ""),
  }),
};
