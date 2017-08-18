"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    "`" +
    // match anything between "`"s greedy so stops at first *
    // note: we include escaped "`"s as well so it doesn't end early
    "((?:[\\s\\S]|\\\\`)+)" +
    "`");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture) { return ({
        tag: "code",
        props: {
            // we replace escaped "`"s to allow for using "`"s inside inline code
            display: "inline",
            content: capture[1].replace("\\`", "`"),
        },
    }); },
};
//# sourceMappingURL=inline-code.js.map