"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tape_1 = require("tape");
var _1 = require("./");
tape_1.test("custom rule", function (t) {
    var rules = _1.defaultRules.concat([
        {
            match: function (source) { return /^@@@([^(?:@@@)].*)@@@/.exec(source); },
            parse: function (capture, _, _a) {
                var inline = _a.inline;
                return ({
                    type: "@@@",
                    props: { content: capture[1], inline: inline },
                });
            },
        },
    ]);
    var p = _1.newParser(rules);
    var input = "some text $some math$ @@@{}@@@";
    var output = [
        {
            type: "paragraph",
            children: [
                { type: "text", props: { content: "some text " } },
                { type: "math", props: { display: "inline", content: "some math" } },
                { type: "text", props: { content: " " } },
                { type: "@@@", props: { content: "{}", inline: true } },
            ],
        },
    ];
    t.deepEqual(p(input), output, "finds @@@ block"), t.end();
});
