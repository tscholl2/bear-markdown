import { Rule } from "../parser";
import { newMathMatcher } from "../utils/math";

export default <Rule>{
  match: newMathMatcher(false),
  parse: capture => ({ tag: "math", props: { display: "block", content: capture[2] } }),
};
