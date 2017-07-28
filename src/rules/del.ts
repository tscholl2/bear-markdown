import { Rule } from "../parser";

export default <Rule>{
  order: 23,
  match: (s, { inline }) => (inline ? /^~~(?=\S)([\s\S]*?\S)~~/.exec(s) : null),
  parse: (capture, parse, state) => ({
    type: "del",
    content: parse(capture[1], state),
  }),
};
