"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function h(tag, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    return { tag: tag, props: props, children: children };
}
exports.default = {
    text: function (n) { return n.props.content; },
    table: function (n, output) { return h.apply(void 0, ["table", undefined].concat(output(n.children))); },
    tablebody: function (n, output) { return h.apply(void 0, ["tbody", undefined].concat(output(n.children))); },
    tablehead: function (n, output) { return h.apply(void 0, ["thead", undefined].concat(output(n.children))); },
    tableheadcolumn: function (n, output) { return h.apply(void 0, ["th", undefined].concat(output(n.children))); },
    tablerow: function (n, output) { return h.apply(void 0, ["tr", undefined].concat(output(n.children))); },
    tablecolumn: function (n, output) { return h.apply(void 0, ["td", undefined].concat(output(n.children))); },
    paragraph: function (n, output) { return h.apply(void 0, ["p", undefined].concat(output(n.children))); },
    list: function (n, output) {
        return h(/^\d/.test(n.bullet) ? "ol" : "ul", undefined, n.items.map(function (i) { return h.apply(void 0, ["li", undefined].concat(output(i))); }));
    },
    link: function (n, output) { return h.apply(void 0, ["a", n.props].concat(output(n.children))); },
    image: function (n, output) { return h.apply(void 0, ["img", n.props].concat(output(n.children))); },
    heading: function (n, output) { return h.apply(void 0, ["h" + n.level, undefined].concat(output(n.children))); },
    emphasis: function (n, output) {
        var delimiters = {
            __: "u",
            _: "em",
            "~~": "s",
            "~": "em",
            "**": "strong",
            "*": "mark",
        };
        return h.apply(void 0, [delimiters[n.delimiter], undefined].concat(output(n.children)));
    },
    comment: function (n) { return n; },
    blockcode: function (n, output) { return h("pre", undefined, h.apply(void 0, ["code", undefined].concat(output(n.children)))); },
    blockquote: function (n, output) { return h.apply(void 0, ["blockquote", undefined].concat(output(n.children))); },
    inlinecode: function (n, output) { return h.apply(void 0, ["code", undefined].concat(output(n.children))); },
    blockMath: function (n, output) { return h.apply(void 0, ["math", undefined].concat(output(n.children))); },
    math: function (n, output) { return h.apply(void 0, ["math", undefined].concat(output(n.children))); },
};
//# sourceMappingURL=html-json.js.map