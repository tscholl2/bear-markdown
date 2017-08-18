"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var block_quote_1 = require("./block-quote");
var block_code_1 = require("./block-code");
var comment_1 = require("./comment");
var emphasis_1 = require("./emphasis");
var escape_1 = require("./escape");
var heading_1 = require("./heading");
var image_1 = require("./image");
var inline_code_1 = require("./inline-code");
var link_1 = require("./link");
var list_1 = require("./list");
var inline_math_1 = require("./inline-math");
var block_math_1 = require("./block-math");
var paragraph_1 = require("./paragraph");
var table_1 = require("./table");
var text_1 = require("./text");
var newline_1 = require("./newline");
exports.defaultRules = [
    tslib_1.__assign({}, comment_1.default, { order: 0 }),
    tslib_1.__assign({}, newline_1.default, { order: 1 }),
    tslib_1.__assign({}, block_quote_1.default, { order: 2 }),
    tslib_1.__assign({}, heading_1.default, { order: 3 }),
    tslib_1.__assign({}, block_math_1.default, { order: 4 }),
    tslib_1.__assign({}, block_code_1.default, { order: 5 }),
    tslib_1.__assign({}, list_1.default, { order: 6 }),
    tslib_1.__assign({}, table_1.default, { order: 7 }),
    tslib_1.__assign({}, paragraph_1.default, { order: 8 }),
    tslib_1.__assign({}, inline_math_1.default, { order: 9 }),
    tslib_1.__assign({}, escape_1.default, { order: 10 }),
    tslib_1.__assign({}, inline_code_1.default, { order: 11 }),
    tslib_1.__assign({}, emphasis_1.default, { order: 12 }),
    tslib_1.__assign({}, image_1.default, { order: 13 }),
    tslib_1.__assign({}, link_1.default, { order: 14 }),
    tslib_1.__assign({}, text_1.default, { order: 15 }),
];
//# sourceMappingURL=index.js.map