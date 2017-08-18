"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^\\!" +
    // look for stuff inside brackets [...]
    "\\[([^\\]]+)?\\]" +
    // look for stuff inside parens (...)
    "\\(" +
    // look for url
    '([^\\)"]+)?' +
    // look for an optional title
    '\\s*(?:"([^"]+)")?' +
    // end parens
    "\\)");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : undefined);
    },
    parse: function (capture) { return ({
        tag: "image",
        props: {
            alt: (capture[1] || "").trim(),
            src: (capture[2] || "").trim(),
            title: (capture[3] || "").trim(),
        },
    }); },
};
//# sourceMappingURL=image.js.map