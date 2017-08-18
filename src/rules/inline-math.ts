import { Rule } from "../parser";
import { newMathMatcher } from "./math";

export default <Rule>{
  match: newMathMatcher(true),
  parse: capture => ({ tag: "math", children: [capture[2]] }),
};
