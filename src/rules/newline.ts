import { Rule } from "../parser";

export default <Rule>{
  order: -1,
  match: s => /^\n/.exec(s),
  parse: () => undefined,
};
