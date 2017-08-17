"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var re = new RegExp("^" +
    // look for between 1 and 6 #'s
    "(#{1,6})\\s*" +
    // then any characters
    "([^\\n]*)" +
    // until the end of the line, which may have some #'s also
    "(?:\\s*#*\\s*)?(?=\n|$)");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? undefined : re.exec(s));
    },
    parse: function (capture, parse, state) {
        if (state === void 0) { state = {}; }
        return ({
            type: "heading",
            level: capture[1].length,
            children: parse(capture[2], tslib_1.__assign({}, state, { inline: true })),
        });
    },
};
//# sourceMappingURL=heading.js.map