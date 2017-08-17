import { Rule } from "../parser";
import { newMathMatcher } from "./math";

export default <Rule>{
  match: newMathMatcher(true),
  parse: capture => ({ type: "math", delimiter: capture[1], content: capture[2] }),
};
