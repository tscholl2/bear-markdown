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
    '\\s*(?:"([^"])")?' +
    // end parens
    "\\)");
exports.default = {
    order: 17,
    match: function (s) { return re.exec(s); },
    parse: function (capture) { return ({
        type: "image",
        alt: capture[1] || "",
        src: capture[2] || "",
        title: capture[3] || "",
    }); },
};
//# sourceMappingURL=image.js.map