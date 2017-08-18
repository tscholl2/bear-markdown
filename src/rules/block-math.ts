import { Rule } from "../parser";
import { newMathMatcher } from "./math";

export default <Rule>{
  match: newMathMatcher(false),
  parse: capture => ({ tag: "blockmath", children: [capture[2]] }),
};
