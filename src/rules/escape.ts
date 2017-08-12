import { Rule } from "../parser";

const re = new RegExp(
  "^\\\\([" +
  "\\" + // \   backslash
  "\\`" + // `   backtick
  "\\*" + // *   asterisk
  "\\_" + // _   underscore
  "\\{\\}" + // {}  curly braces
  "\\[\\]" + // []  square brackets
  "\\(\\)" + // ()  parentheses
  "\\#" + // #   hash mark
  "\\+" + // +   plus sign
  "\\-" + // -   minus sign (hyphen)
  "\\." + // .   dot
  "\\!" + // !   exclamation mark
  "\\<" + // <   less-than    <-- added in Spec Markdown
  "\\>" + // >   greater-than <-- added in Spec Markdown
  "\\|" + // |   pipe         <-- added in Spec Markdown
  "\\$" + // $   dollar sign  <-- added by me (b/c math)
  "\\~" + // ~   tilde        <-- added by me (b/c ~ is used in emphasis)
    "])",
);

export default <Rule>{
  order: -1,
  match: (s, { inline }) => (inline ? re.exec(s) : null),
  parse: capture => ({
    type: "text",
    content: capture[1],
  }),
};
