import { Rule } from "../parser";

export default <Rule>{
  order: -1,
  match: s => /<!--[\s\S]*-->/.exec(s),
  parse: capture => ({
    type: "comment",
    content: capture[1],
  }),
};
