import { Rule } from "../parser";

export default <Rule>{
  order: 21,
  match: (s, { inline }) => (inline ? /^__([\s\S]+)__/.exec(s) : null),
  parse: (capture, parse, state) => ({
    type: "u",
    content: parse(capture[1], state),
  }),
};
