"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    "`" +
    // match anything between `'s greedy so stops at first *
    "([\\s\\S]+)" +
    "`");
exports.default = {
    order: 24,
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture) { return ({
        type: "inlineCode",
        content: capture[2],
    }); },
};
//# sourceMappingURL=inline-code.js.map