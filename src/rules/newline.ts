import { Rule } from "../parser";

export default <Rule>{
  match: s => /^\n/.exec(s),
  parse: () => undefined,
};
