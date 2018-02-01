"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    // look for stuff inside brackets [...]
    "\\[([^\\]]+)\\]" +
    // look for stuff inside parens (...)
    "\\(([^\\)]+)\\)");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture, parse, state) { return ({
        type: "link",
        props: { href: capture[2] },
        children: parse(capture[1], Object.assign({}, state, { inline: true })),
    }); },
};
