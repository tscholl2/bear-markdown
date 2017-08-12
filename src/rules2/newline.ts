import { Rule } from "../parser";

export default <Rule>{
  order: -1,
  match: (s, { inline }) => (inline ? undefined : /^\n/.exec(s)),
  parse: () => undefined,
};
