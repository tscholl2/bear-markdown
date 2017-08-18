"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var START_TO_END_DELIMITER = {
    $: "$",
    $$: "$$",
    "\\[": "\\]",
    "\\(": "\\)",
};
function newMathMatcher(inlineMatcher) {
    return function (s, _a, previousCapture) {
        var _b = _a.inline, inline = _b === void 0 ? false : _b;
        if (previousCapture.endsWith("\\") || inline != inlineMatcher) {
            return;
        }
        var startRE = (inlineMatcher ? /^(\$|\\\()/ : /^(\$\$|\\\[)/).exec(s);
        if (startRE == null) {
            return;
        }
        var start = startRE[1];
        var end = START_TO_END_DELIMITER[start];
        s = s.substr(start.length);
        var match = "";
        var brace = 0;
        var escaped = false;
        while (!s.startsWith(end) || brace !== 0 || escaped) {
            escaped = s.startsWith("\\");
            brace += s.startsWith("{") ? 1 : s.startsWith("}") ? -1 : 0;
            match += s[0];
            s = s.substr(1);
        }
        return s !== "" ? [start + match + end, start + end, match] : undefined;
    };
}
exports.newMathMatcher = newMathMatcher;
//# sourceMappingURL=math.js.map