import { Rule } from "../parser";

export default <Rule>{
  match: s => /^\s*\n/.exec(s),
  parse: () => undefined,
};
