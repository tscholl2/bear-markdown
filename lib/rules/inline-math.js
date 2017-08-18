"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("./math");
exports.default = {
    match: math_1.newMathMatcher(true),
    parse: function (capture) { return ({ tag: "math", children: [capture[2]] }); },
};
//# sourceMappingURL=inline-math.js.map