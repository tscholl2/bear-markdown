"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function h(tag, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var attr = Object.keys(props || {}).reduce(function (p, n) { return p + " \"" + n + "\"=\"" + props[n] + "\""; }, "");
    return "<" + tag + (attr ? " " + attr : "") + ">" + children.join("") + "</" + tag + ">";
}
exports.default = {
    text: function (n) { return n.props.content; },
    table: function (n, output) { return h.apply(void 0, ["table", undefined].concat(output(n.children))); },
    tablehead: function (n, output) { return h.apply(void 0, ["thead", undefined].concat(output(n.children))); },
    tableheadcolumn: function (n, output) { return h.apply(void 0, ["th", n.props].concat(output(n.children))); },
    tablebody: function (n, output) { return h.apply(void 0, ["tbody", undefined].concat(output(n.children))); },
    tablerow: function (n, output) { return h.apply(void 0, ["tr", undefined].concat(output(n.children))); },
    tablecolumn: function (n, output) { return h.apply(void 0, ["td", undefined].concat(output(n.children))); },
    paragraph: function (n, output) { return h.apply(void 0, ["p", undefined].concat(output(n.children))); },
    list: function (n, output) {
        return h.apply(void 0, [/^\d/.test(n.props.bullet) ? "ol" : "ul", undefined].concat(output(n.children)));
    },
    listitem: function (n, output) { return h.apply(void 0, ["li", undefined].concat(output(n.children))); },
    link: function (n, output) { return h.apply(void 0, ["a", n.props].concat(output(n.children))); },
    image: function (n) { return h("img", n.props); },
    heading: function (n, output) { return h.apply(void 0, ["h" + n.props.level, undefined].concat(output(n.children))); },
    emphasis: function (n, output) {
        var delimiters = { __: "u", _: "em", "~~": "s", "~": "em", "**": "strong", "*": "mark" };
        return h.apply(void 0, [delimiters[n.delimiter], undefined].concat(output(n.children)));
    },
    comment: function (n) { return "<!--" + n.props.content + "-->"; },
    code: function (n) {
        return n.props.display === "inline"
            ? h("code", undefined, n.props.content)
            : h("pre", undefined, h("code", undefined, n.props.content));
    },
    blockquote: function (n, output) { return h.apply(void 0, ["blockquote", undefined].concat(output(n.children))); },
    math: function (n) { return h("math", undefined, n.props.content); },
};
//# sourceMappingURL=html.js.map