"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        // This is taken from the text rule from simple-markdown.
        // It takes at least one letter (that isn't a newline)
        // and keep going until we get to something that
        // might possibly match something else (image, emphasis, etc.)
        // or the end of the match.
        // TODO: explain this regexp
        return inline ? /^[^\n]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n|$)/.exec(s) : null;
    },
    parse: function (capture) { return ({ type: "text", props: { content: capture[0] } }); },
};
//# sourceMappingURL=text.js.map