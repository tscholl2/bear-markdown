"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inc = function (s) {
    s.id = s.id || 0;
    s.id++;
    return s.id;
};
function newHTMLPrinters(h) {
    return {
        text: function (n) { return n.props.content; },
        table: function (n, output, s) { return h("table", { id: inc(s) }, output(n.children)); },
        tablehead: function (n, output, s) { return h("thead", { id: inc(s) }, output(n.children)); },
        tableheadcolumn: function (n, output, s) {
            return h("th", Object.assign({}, n.props, { id: inc(s) }), output(n.children));
        },
        tablebody: function (n, output, s) { return h("tbody", { id: inc(s) }, output(n.children)); },
        tablerow: function (n, output, s) { return h("tr", { id: inc(s) }, output(n.children)); },
        tablecolumn: function (n, output, s) { return h("td", { id: inc(s) }, output(n.children)); },
        paragraph: function (n, output, s) { return h("p", { id: inc(s) }, output(n.children)); },
        list: function (n, output, s) {
            return h(/^\d/.test(n.props.bullet) ? "ol" : "ul", { id: inc(s) }, output(n.children));
        },
        listitem: function (n, output, s) { return h("li", { id: inc(s) }, output(n.children)); },
        link: function (n, output, s) { return h("a", Object.assign({}, n.props, { id: inc(s) }), output(n.children)); },
        image: function (n, _, s) { return h("img", Object.assign({}, n.props, { id: inc(s) })); },
        heading: function (n, output, s) { return h("h" + n.props.level, { id: inc(s) }, output(n.children)); },
        emphasis: function (n, output, s) {
            var delimiters = {
                __: "u",
                _: "em",
                "~~": "s",
                "~": "em",
                "**": "strong",
                "*": "mark",
            };
            return h(delimiters[n.props.delimiter], { id: inc(s) }, output(n.children));
        },
        comment: function (n) { return "<!--" + n.props.content + "-->"; },
        code: function (n, _, s) {
            return n.props.display === "inline"
                ? h("code", { id: inc(s) }, n.props.content)
                : h("pre", { id: inc(s) }, [h("code", { id: inc(s) }, [n.props.content])]);
        },
        blockquote: function (n, output, s) { return h("blockquote", { id: inc(s) }, output(n.children)); },
        math: function (n, _, s) { return h("math", { id: inc(s) }, n.props.content); },
    };
}
exports.newHTMLPrinters = newHTMLPrinters;
exports.html = newHTMLPrinters(function (tag, attr, children) {
    if (attr === void 0) { attr = {}; }
    if (children === void 0) { children = []; }
    return "<" + tag + Object.keys(attr).reduce(function (p, n) { return p + (" \"" + n + "\"=\"" + attr[n] + "\""); }, "") + ">" + children.join("") + "</" + tag + ">";
});
// export const react = newHTMLPrinters((tag, attr = {}, children = []) => {});
//# sourceMappingURL=index.js.map