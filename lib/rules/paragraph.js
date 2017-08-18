"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: explain
var re = new RegExp("^" +
    // match everything
    "([\\s\\S]+?)" +
    // until the first double new line (i.e. blank line) or end
    "(?:\n\n|$)");
exports.default = {
    match: function (s, _a, previousMatch) {
        var inline = _a.inline;
        if (inline) {
            return;
        }
        // a paragraph must start on a new line
        if (!(previousMatch === "" || previousMatch.endsWith("\n"))) {
            return;
        }
        return re.exec(s);
    },
    parse: function (capture, parse, state) { return ({
        type: "paragraph",
        children: parse(capture[1].trim(), Object.assign({}, state, { inline: true })),
    }); },
};
//# sourceMappingURL=paragraph.js.map