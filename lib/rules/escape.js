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
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : undefined);
    },
    parse: function (capture) { return ({ tag: "text", props: { content: capture[1] } }); },
};
//# sourceMappingURL=escape.js.map