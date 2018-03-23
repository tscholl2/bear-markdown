"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * newPrinter takes a map from types to printers and returns a
 * printer function that prints a given tree with those printers.
 */
function newPrinter(printers) {
    return function print(tree, state) {
        if (state === void 0) { state = {}; }
        var output = [];
        for (var i = 0; i < tree.length; i++) {
            var node = tree[i];
            if (!printers.hasOwnProperty(node.type)) {
                throw new Error("no printer for type: " + node.type);
            }
            output.push(printers[node.type](node, print, state));
        }
        return output;
    };
}
exports.newPrinter = newPrinter;
var pk = function (n, s) {
    return Object.assign({}, n.props, s, { key: (s.key = (s.key || 0) + 1) });
};
var delimiters = {
    __: "u",
    _: "em",
    "~~": "s",
    "~": "del",
    "**": "strong",
    "*": "mark",
};
// newNodePrinters is useful for printing Nodes to VirtualNodes in various frameworks like
// React. You should be able to use `newNodePrinters(react.createElement)`.
function newNodePrinters(h) {
    return {
        text: function (n) { return n.props.content; },
        table: function (n, print, s) { return h("table", pk(n, s), print(n.children, s)); },
        tablehead: function (n, print, s) { return h("thead", pk(n, s), print(n.children, s)); },
        tableheadcolumn: function (n, print, s) { return h("th", pk(n, s), print(n.children, s)); },
        tablebody: function (n, print, s) { return h("tbody", pk(n, s), print(n.children, s)); },
        tablerow: function (n, print, s) { return h("tr", pk(n, s), print(n.children, s)); },
        tablecolumn: function (n, print, s) { return h("td", pk(n, s), print(n.children, s)); },
        paragraph: function (n, print, s) { return h("p", pk(n, s), print(n.children, s)); },
        list: function (n, print, s) {
            return h(/^\d/.test(n.props.bullet) ? "ol" : "ul", pk(n, s), print(n.children, s));
        },
        listitem: function (n, print, s) { return h("li", pk(n, s), print(n.children, s)); },
        link: function (n, print, s) { return h("a", pk(n, s), print(n.children, s)); },
        image: function (n, _, s) { return h("img", pk(n, s)); },
        heading: function (n, print, s) { return h("h" + n.props.level, pk(n, s), print(n.children, s)); },
        emphasis: function (n, print, s) { return h(delimiters[n.props.delimiter], pk(n, s), print(n.children, s)); },
        comment: function (n) { return "<!--" + n.props.content + "-->"; },
        code: function (n, _, s) {
            return n.props.display === "inline"
                ? h("code", pk(n, s), [n.props.content.trim()])
                : h("pre", pk(n, s), [h("code", pk(n, s), [n.props.content.trim()])]);
        },
        blockquote: function (n, print, s) { return h("blockquote", pk(n, s), print(n.children, s)); },
        math: function (n, _, s) { return h("math", pk(n, s), [n.props.content.trim()]); },
    };
}
exports.newNodePrinters = newNodePrinters;
