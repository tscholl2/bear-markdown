"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    // match everything between <!-- and -->
    "<!--" +
    // will match until non-closing
    "[^(?:\\-\\->)]" +
    // closing -->
    "-->");
exports.default = {
    match: function (s) { return re.exec(s); },
    parse: function (capture) { return ({ tag: "comment", props: { content: capture[1] } }); },
};
//# sourceMappingURL=comment.js.map