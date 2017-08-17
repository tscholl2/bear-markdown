import { Rule } from "../parser";

export default <Rule>{
  match: (s, { inline }) =>
    // take at least one letter (that isn't a newline)
    // and keep going until we get to something that
    // might possibly match something else (image, emphasis, etc.)
    // or the end of the match
    inline ? /^[^\n]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n|$)/.exec(s) : null,
  parse: capture => ({ type: "text", content: capture[0] }),
};
