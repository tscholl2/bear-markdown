"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^\\\\([" +
    "\\" +
    "\\`" +
    "\\*" +
    "\\_" +
    "\\{\\}" +
    "\\[\\]" +
    "\\(\\)" +
    "\\#" +
    "\\+" +
    "\\-" +
    "\\." +
    "\\!" +
    "\\<" +
    "\\>" +
    "\\|" +
    "\\$" +
    "\\~" +
    "])");
exports.default = {
    order: -1,
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture) { return ({
        type: "text",
        content: capture[1],
    }); },
};
//# sourceMappingURL=escape.js.map