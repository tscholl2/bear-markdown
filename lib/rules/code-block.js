"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    "```" +
    // match anything between ```'s greedy so stops at first ```
    // note: we include escaped delimiters e.g. "\```"
    "((?:[\\s\\S]|\\\\```)+)?" +
    "```");
exports.default = {
    order: 24,
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? null : re.exec(s));
    },
    parse: function (capture) { return ({
        type: "codeBlock",
        content: capture[1].replace(/\\```/g, "```"),
    }); },
};
//# sourceMappingURL=code-block.js.map