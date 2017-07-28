import { Rule } from "../parser";

export default <Rule>{
  order: 10,
  match: (s, { inline }) => (inline ? null : /^(?:\n *)*\n/.exec(s)),
  parse: () => ({ type: "newline" }),
};
