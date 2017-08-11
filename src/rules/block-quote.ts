import { Rule } from "../parser";

export default <Rule>{
  order: 6,
  match: (s, { inline }) => (inline ? null : /^( *>[^\n]+)+\n{1,}/.exec(s)),
  parse: (capture, parse, state) => ({
    type: "blockQuote",
    content: parse(capture[0].replace(/^ *> ?/gm, ""), state),
  }),
};
