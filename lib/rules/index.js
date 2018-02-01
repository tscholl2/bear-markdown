"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    Object.assign({}, comment_1.default, { order: 0 }),
    // BLOCKS
    Object.assign({}, newline_1.default, { order: 1 }),
    Object.assign({}, block_quote_1.default, { order: 2 }),
    Object.assign({}, heading_1.default, { order: 3 }),
    Object.assign({}, block_math_1.default, { order: 4 }),
    Object.assign({}, block_code_1.default, { order: 5 }),
    Object.assign({}, list_1.default, { order: 6 }),
    Object.assign({}, table_1.default, { order: 7 }),
    Object.assign({}, paragraph_1.default, { order: 8 }),
    // INLINE
    Object.assign({}, inline_math_1.default, { order: 9 }),
    Object.assign({}, escape_1.default, { order: 10 }),
    Object.assign({}, inline_code_1.default, { order: 11 }),
    Object.assign({}, emphasis_1.default, { order: 12 }),
    Object.assign({}, image_1.default, { order: 13 }),
    Object.assign({}, link_1.default, { order: 14 }),
    Object.assign({}, text_1.default, { order: 15 }),
];
