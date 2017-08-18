"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("./math");
exports.default = {
    match: math_1.newMathMatcher(false),
    parse: function (capture) { return ({ tag: "blockmath", children: [capture[2]] }); },
};
//# sourceMappingURL=block-math.js.map