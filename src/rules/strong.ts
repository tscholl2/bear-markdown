import { Rule } from "../parser";

export default <Rule>{
  order: 20,
  match: (s, { inline }) => (inline ? /^\*([\s\S]+)\*/.exec(s) : null),
  parse: (capture, parse, state) => ({
    type: "strong",
    content: parse(capture[1], state),
  }),
};
