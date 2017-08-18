import { Rule } from "../parser";
import { newMathMatcher } from "../utils/math";

export default <Rule>{
  match: newMathMatcher(true),
  parse: capture => ({ type: "math", props: { display: "inline", content: capture[2] } }),
};
