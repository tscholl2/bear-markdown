"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
        href: capture[2],
        children: parse(capture[1], tslib_1.__assign({}, state, { inline: true })),
    }); },
};
//# sourceMappingURL=link.js.map