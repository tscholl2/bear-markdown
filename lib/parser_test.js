"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tape_1 = require("tape");
var _1 = require("./");
tape_1.test("default rules:", function (t) {
    require("./parser_tests.json").forEach(function (c) {
        return t.deepEqual(_1.defaultParser(c.input), c.output, c.description);
    });
    t.end();
});
