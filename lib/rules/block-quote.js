"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^(" +
    // any amount of space and a >
    "\\s*>" +
    // match any non-newlines
    "[^\\n]*" +
    // find all lines like this
    ")+" +
    // repeat until a newline or end
    "(\\n|$)");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? undefined : re.exec(s));
    },
    parse: function (capture, parse, state) { return ({
        type: "blockquote",
        // parse by replacing the initial ">" in front of lines
        children: parse(capture[0].replace(/^\s*> ?/gm, ""), state),
    }); },
};
