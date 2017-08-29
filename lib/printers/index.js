"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inc = function (s) {
    s.key = (s.key || 0) + 1;
    return s.key;
};
var delimiters = {
    __: "u",
    _: "em",
    "~~": "s",
    "~": "em",
    "**": "strong",
    "*": "mark",
};
function newHTMLPrinters(h) {
    return {
        text: function (n) { return n.props.content; },
        table: function (n, print, s) { return h("table", { key: inc(s) }, print(n.children, s)); },
        tablehead: function (n, print, s) { return h("thead", { key: inc(s) }, print(n.children, s)); },
        tableheadcolumn: function (n, print, s) {
            return h("th", Object.assign({}, n.props, { key: inc(s) }), print(n.children, s));
        },
        tablebody: function (n, print, s) { return h("tbody", { key: inc(s) }, print(n.children, s)); },
        tablerow: function (n, print, s) { return h("tr", { key: inc(s) }, print(n.children, s)); },
        tablecolumn: function (n, print, s) { return h("td", { key: inc(s) }, print(n.children, s)); },
        paragraph: function (n, print, s) { return h("p", { key: inc(s) }, print(n.children, s)); },
        list: function (n, print, s) {
            return h(/^\d/.test(n.props.bullet) ? "ol" : "ul", { key: inc(s) }, print(n.children, s));
        },
        listitem: function (n, print, s) { return h("li", { key: inc(s) }, print(n.children, s)); },
        link: function (n, print, s) {
            return h("a", Object.assign({}, n.props, { key: inc(s) }), print(n.children, s));
        },
        image: function (n, _, s) { return h("img", Object.assign({}, n.props, { key: inc(s) })); },
        heading: function (n, print, s) { return h("h" + n.props.level, { key: inc(s) }, print(n.children, s)); },
        emphasis: function (n, print, s) {
            return h(delimiters[n.props.delimiter], { key: inc(s) }, print(n.children, s));
        },
        comment: function (n) { return "<!--" + n.props.content + "-->"; },
        code: function (n, _, s) {
            return n.props.display === "inline"
                ? h("code", { key: inc(s) }, [n.props.content])
                : h("pre", { key: inc(s) }, [h("code", { key: inc(s) }, [n.props.content])]);
        },
        blockquote: function (n, print, s) { return h("blockquote", { key: inc(s) }, print(n.children, s)); },
        math: function (n, _, s) { return h("math", { key: inc(s) }, n.props.content); },
    };
}
exports.newHTMLPrinters = newHTMLPrinters;
exports.html = newHTMLPrinters(function (tag, attr, children) {
    if (attr === void 0) { attr = {}; }
    if (children === void 0) { children = []; }
    var a = "";
    for (var key in attr) {
        if (attr.hasOwnProperty(key) && key != "id") {
            a += " \"" + key + "\"=\"" + attr[key] + "\"";
        }
    }
    return "<" + tag + a + ">" + children.join("") + "</" + tag + ">";
});
exports.react = newHTMLPrinters(function (type, data, children) {
    if (data === void 0) { data = {}; }
    if (children === void 0) { children = []; }
    return ({
        type: type,
        key: data.key,
        props: Object.assign({ children: children }, data, { key: undefined }),
    });
});
exports.hyperapp = newHTMLPrinters(function (tag, data, children) {
    if (data === void 0) { data = {}; }
    if (children === void 0) { children = []; }
    return ({
        tag: tag,
        data: data,
        children: children,
    });
});
//# sourceMappingURL=index.js.map