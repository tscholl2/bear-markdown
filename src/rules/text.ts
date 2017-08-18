import { Rule } from "../parser";

export default <Rule>{
  match: (s, { inline }) =>
    // This is taken from the text rule from simple-markdown.
    // It takes at least one letter (that isn't a newline)
    // and keep going until we get to something that
    // might possibly match something else (image, emphasis, etc.)
    // or the end of the match.
    // TODO: explain this regexp
    inline ? /^[^\n]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n|$)/.exec(s) : null,
  parse: capture => ({ tag: "text", props: { content: capture[0] } }),
};
