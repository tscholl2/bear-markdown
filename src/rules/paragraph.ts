import { Rule } from "../parser";

// TODO: explain
const re = new RegExp(
  "^" +
    // match everything
    "([\\s\\S]+?)" +
    // until the first double new line (i.e. blank line) or end
    "(?:\n\n|$)",
);

export default <Rule>{
  order: -1,
  match: (s, { inline }, previousMatch) => {
    if (inline) {
      return;
    }
    // a paragraph must start on a new line
    if (!(previousMatch === "" || previousMatch.endsWith("\n"))) {
      return;
    }
    return re.exec(s);
  },
  parse: (capture, parse, state) => ({
    type: "paragraph",
    children: parse(capture[1].trim(), { ...state, inline: true }),
  }),
};
