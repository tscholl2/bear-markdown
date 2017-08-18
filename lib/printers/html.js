"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function h(tag, props, children) {
    if (props === void 0) { props = {}; }
    if (children === void 0) { children = []; }
    var attr = Object.keys(props).reduce(function (p, n) { return p + (" \"" + n + "\"=\"" + props[n] + "\""); }, "");
    return "<" + tag + attr.trim() + ">" + children.join("") + "</" + tag + ">";
}
exports.default = {
    text: function (n) { return n.props.content; },
    table: function (n, output) { return h("table", undefined, output(n.children)); },
    tablehead: function (n, output) { return h("thead", undefined, output(n.children)); },
    tableheadcolumn: function (n, output) { return h("th", n.props, output(n.children)); },
    tablebody: function (n, output) { return h("tbody", undefined, output(n.children)); },
    tablerow: function (n, output) { return h("tr", undefined, output(n.children)); },
    tablecolumn: function (n, output) { return h("td", undefined, output(n.children)); },
    paragraph: function (n, output) { return h("p", undefined, output(n.children)); },
    list: function (n, output) {
        return h(/^\d/.test(n.props.bullet) ? "ol" : "ul", undefined, output(n.children));
    },
    listitem: function (n, output) { return h("li", undefined, output(n.children)); },
    link: function (n, output) { return h("a", n.props, output(n.children)); },
    image: function (n) { return h("img", n.props); },
    heading: function (n, output) { return h("h" + n.props.level, undefined, output(n.children)); },
    emphasis: function (n, output) {
        var delimiters = { __: "u", _: "em", "~~": "s", "~": "em", "**": "strong", "*": "mark" };
        return h(delimiters[n.delimiter], undefined, output(n.children));
    },
    comment: function (n) { return "<!--" + n.props.content + "-->"; },
    code: function (n) {
        return n.props.display === "inline"
            ? h("code", undefined, n.props.content)
            : h("pre", undefined, [h("code", undefined, [n.props.content])]);
    },
    blockquote: function (n, output) { return h("blockquote", undefined, output(n.children)); },
    math: function (n) { return h("math", undefined, n.props.content); },
};
//# sourceMappingURL=html.js.map