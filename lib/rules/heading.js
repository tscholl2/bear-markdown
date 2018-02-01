"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            props: { level: capture[1].length },
            children: parse(capture[2], Object.assign({}, state, { inline: true })),
        });
    },
};
