"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../utils/math");
exports.default = {
    match: math_1.newMathMatcher(false),
    parse: function (capture) { return ({ type: "math", props: { display: "block", content: capture[2] } }); },
};
//# sourceMappingURL=block-math.js.map