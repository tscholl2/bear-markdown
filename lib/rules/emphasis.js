"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    // delimters are __, **, ~~, _, *, or ~
    "(__|\\*\\*|~~|_|\\*|~)" +
    // match until the next matching delimiter
    // note: we also include escaped delimiters e.g. \* or \~
    // note note: we don't need to replace these because
    // the match is parsed so they will be escaped properly
    "((?:\\\\\\1|[^(?:\\1)])*)?" +
    "\\1");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : undefined);
    },
    parse: function (capture, parse, state) { return ({
        tag: "emphasis",
        props: { delimiter: capture[1] },
        children: parse(capture[2], state),
    }); },
};
//# sourceMappingURL=emphasis.js.map