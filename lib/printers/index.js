"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printers = {
    text: {
        html: function (n) { return document.createTextNode(n.content); },
    },
    table: {
        html: function (n, s, output) {
            var table = document.createElement("table");
            var head = document.createElement("thead");
            output(n.head).forEach(function (c, i) {
                var th = document.createElement("th");
                th.align = n.align[i];
                th.appendChild(c);
                head.appendChild(th);
            });
            table.appendChild(head);
            var body = document.createElement("tbody");
            n.rows.map(function (r) { return output(r, s); }).forEach(function (r) {
                var row = document.createElement("tr");
                r.forEach(function (c) { return row.appendChild(c); });
                body.appendChild(row);
            });
            table.appendChild(body);
            return table;
        },
    },
    paragraph: {
        html: function (n, s, output) {
            var p = document.createElement("p");
            output(n.children, s).forEach(function (c) { return p.appendChild(c); });
            return p;
        },
    },
    list: {
        html: function (n, s, output) {
            var l = document.createElement(/^\d/.test(n.bullet) ? "ol" : "ul");
            n.items.forEach(function (item) {
                var i = document.createElement("li");
                output(item, s).forEach(function (c) { return i.appendChild(c); });
                l.appendChild(i);
            });
            return l;
        },
    },
    link: {
        html: function (n, s, output) {
            var a = document.createElement("a");
            a.href = n.href;
            output(n.children, s).forEach(function (c) { return a.appendChild(c); });
            return a;
        },
    },
    image: {
        html: function (n) {
            var i = document.createElement("img");
            i.alt = n.alt;
            i.src = n.src;
            i.title = n.title;
            return i;
        },
    },
    heading: {
        html: function (n, s, output) {
            var h = document.createElement("h" + n.level);
            output(n.children, s).forEach(function (c) { return h.appendChild(c); });
            return h;
        },
    },
    emphasis: {
        html: function (n, s, output) {
            var delimiters = {
                __: "u",
                _: "em",
                "~~": "s",
                "~": "em",
                "**": "strong",
                "*": "mark",
            };
            var e = document.createElement(delimiters[n.delimiter]);
            output(n.children, s).forEach(function (c) { return e.appendChild(c); });
            return e;
        },
    },
    comment: {
        html: function (n) { return document.createComment(n.content); },
    },
    codeBlock: {
        html: function (n) {
            var pr = document.createElement("pre");
            var c = document.createElement("code");
            c.appendChild(document.createTextNode(n.content));
            pr.appendChild(c);
            return pr;
        },
    },
    blockQuote: {
        html: function (n, s, output) {
            var bq = document.createElement("blockquote");
            output(n.children, s).forEach(function (c) { return bq.appendChild(c); });
            return bq;
        },
    },
    inlineCode: {
        html: function (n) {
            var cd = document.createElement("code");
            cd.appendChild(document.createTextNode(n.content));
            return cd;
        },
    },
};
//# sourceMappingURL=index.js.map