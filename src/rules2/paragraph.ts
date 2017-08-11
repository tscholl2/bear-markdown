import { Rule } from "../parser";

// TODO: explain
// match everything until the first (i.e. non-greedy) double new line (i.e. blank line)
const re = new RegExp("^" + "([\\s\\S]+?)" + "(?=\n\n|$)");

export default <Rule>{
  order: -1,
  match: (s, { inline }) => (inline ? null : re.exec(s)),
  parse: (capture, parse, state) =>
    /^\s*$/.test(capture[1])
      ? undefined
      : {
          type: "paragraph",
          content: parse(capture[1].trim(), { ...state, inline: true }),
        },
};
