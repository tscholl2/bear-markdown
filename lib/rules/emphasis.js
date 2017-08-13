"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    // delimters are __, **, ~~, _, *, or ~
    "(__|\\*\\*|~~|_|\\*|~)" +
    // match until the next matching delimiter
    "([^(?:\\1)]*)?" +
    "\\1");
exports.default = {
    order: 23,
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture, parse, state) { return ({
        type: "emphasis",
        delimiter: capture[1],
        children: parse(capture[2], state),
    }); },
};
//# sourceMappingURL=emphasis.js.map