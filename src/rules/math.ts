import { Rule } from "../parser";

export default <Rule>{
  order: 3.5,
  // TODO
  match: () => null,
  parse: () => ({ type: "math" }),
};
