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
    order: -1,
    match: function (s) { return re.exec(s); },
    parse: function (capture) { return ({
        type: "comment",
        content: capture[1],
    }); },
};
//# sourceMappingURL=comment.js.map