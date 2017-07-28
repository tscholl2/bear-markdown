import { Rule } from "../parser";

export default <Rule>{
  order: 22,
  match: (s, { inline }) => (inline ? /^_([\s\S]+)_/.exec(s) : null),
  parse: (capture, parse, state) => ({
    type: "em",
    content: parse(capture[1], state),
  }),
};
