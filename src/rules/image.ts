import { Rule } from "../parser";

const LINK_INSIDE = "(?:\\[[^\\]]*\\]|[^\\]]|\\](?=[^\\[]*\\]))*";
const LINK_HREF_AND_TITLE = "\\s*<?((?:[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*";

var UNESCAPE_URL_R = /\\([^0-9A-Za-z\s])/g;

function unescapeUrl(rawUrlString: string) {
  return rawUrlString.replace(UNESCAPE_URL_R, "$1");
}

const re = new RegExp("^!\\[(" + LINK_INSIDE + ")\\]\\(" + LINK_HREF_AND_TITLE + "\\)");

export default <Rule>{
  order: 17,
  match: (s, { inline }) => (inline ? re.exec(s) : null),
  parse: capture => ({
    type: "image",
    alt: capture[1],
    target: unescapeUrl(capture[2]),
    title: capture[3],
  }),
};
