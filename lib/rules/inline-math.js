"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../utils/math");
exports.default = {
    match: math_1.newMathMatcher(true),
    parse: function (capture) { return ({ tag: "math", props: { display: "inline", content: capture[2] } }); },
};
//# sourceMappingURL=inline-math.js.map