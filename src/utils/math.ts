import { Rule } from "../parser";

const START_TO_END_DELIMITER: any = {
  $: "$",
  $$: "$$",
  "\\[": "\\]",
  "\\(": "\\)",
};

export function newMathMatcher(inlineMatcher: boolean): Rule["match"] {
  return (s, { inline = false }, previousCapture) => {
    if (previousCapture.endsWith("\\") || inline != inlineMatcher) {
      return;
    }
    const startRE = (inlineMatcher ? /^(\$|\\\()/ : /^(\$\$|\\\[)/).exec(s);
    if (startRE == null) {
      return;
    }
    const start = startRE[1];
    const end = START_TO_END_DELIMITER[start];
    s = s.substr(start.length);
    let match = "";
    let brace = 0;
    let escaped = false;
    while (!s.startsWith(end) || brace !== 0 || escaped) {
      if (s === "") {
        return;
      }
      escaped = s.startsWith("\\");
      brace += s.startsWith("{") ? 1 : s.startsWith("}") ? -1 : 0;
      match += s[0];
      s = s.substr(1);
    }
    return s !== "" ? [start + match + end, start + end, match] : undefined;
  };
}
