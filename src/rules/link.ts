import { Rule } from "../parser";

const LINK_INSIDE = "(?:\\[[^\\]]*\\]|[^\\]]|\\](?=[^\\[]*\\]))*";
const LINK_HREF_AND_TITLE = "\\s*<?((?:[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*";
const UNESCAPE_URL_R = /\\([^0-9A-Za-z\s])/g;
const re = new RegExp("^\\[(" + LINK_INSIDE + ")\\]\\(" + LINK_HREF_AND_TITLE + "\\)");

function unescapeUrl(rawUrlString: string) {
  return rawUrlString.replace(UNESCAPE_URL_R, "$1");
}

export default <Rule>{
  order: 16,
  match: (s, { inline }) => (inline ? re.exec(s) : null),
  parse: (capture, parse, state) => ({
    type: "link",
    content: parse(capture[1], state),
    target: unescapeUrl(capture[2]),
    title: capture[3],
  }),
};
