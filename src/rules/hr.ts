import { Rule } from "../parser";

export default <Rule>{
  order: 3,
  match: (s, { inline }) => (inline ? null : /^( *[-*_]){3,} *(?:\n *)+\n/.exec(s)),
  parse: () => ({ type: "hr" }),
};
