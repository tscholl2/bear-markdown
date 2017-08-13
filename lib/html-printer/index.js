"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function printHTML(tree, state) {
    if (tree === void 0) { tree = []; }
    if (state === void 0) { state = {}; }
    return tree.map(function (n) {
        switch (n.type) {
            case "text":
                return document.createTextNode(n.content);
            case "table":
                var table = document.createElement("table");
                var head_1 = document.createElement("thead");
                n.head.forEach(function (d, i) {
                    var th = document.createElement("th");
                    th.align = n.align[i];
                    printHTML(d, state).forEach(function (c) { return th.appendChild(c); });
                    head_1.appendChild(th);
                });
                table.appendChild(head_1);
                var body_1 = document.createElement("tbody");
                n.rows.forEach(function (r) {
                    var row = document.createElement("tr");
                    printHTML(r, state).forEach(function (c) { return row.appendChild(c); });
                    body_1.appendChild(row);
                });
                table.appendChild(body_1);
                return table;
            case "paragraph":
                var p_1 = document.createElement("p");
                printHTML(n.children, state).forEach(function (c) { return p_1.appendChild(c); });
                return p_1;
            case "list":
                var l_1 = document.createElement(/^\d/.test(n.bullet) ? "ol" : "ul");
                n.items.forEach(function (item) {
                    var i = document.createElement("li");
                    printHTML(item, state).forEach(function (c) { return i.appendChild(c); });
                    l_1.appendChild(i);
                });
                return l_1;
            case "link":
                var a_1 = document.createElement("a");
                a_1.href = n.href;
                printHTML(n.children, state).forEach(function (c) { return a_1.appendChild(c); });
                return a_1;
            case "image":
                var i = document.createElement("img");
                i.alt = n.alt;
                i.src = n.src;
                i.title = n.title;
                return i;
            case "heading":
                var h_1 = document.createElement("h" + n.level);
                printHTML(n.children, state).forEach(function (c) { return h_1.appendChild(c); });
                return h_1;
            case "emphasis":
                var delimiters = {
                    __: "u",
                    _: "em",
                    "~~": "s",
                    "~": "em",
                    "**": "strong",
                    "*": "mark",
                };
                var e_1 = document.createElement(delimiters[n.delimiter]);
                printHTML(n.children, state).forEach(function (c) { return e_1.appendChild(c); });
                return e_1;
            case "comment":
                return document.createComment(n.content);
            case "codeBlock":
                var pr = document.createElement("pre");
                var c = document.createElement("code");
                c.appendChild(document.createTextNode(n.content));
                pr.appendChild(c);
                return pr;
            case "blockQuote":
                var bq_1 = document.createElement("blockquote");
                printHTML(n.children, state).forEach(function (c) { return bq_1.appendChild(c); });
                return bq_1;
            case "inlineCode":
                var cd = document.createElement("code");
                cd.appendChild(document.createTextNode(n.content));
                return cd;
            default:
                throw new Error("unimplemented node: " + n.type);
        }
    });
}
exports.printHTML = printHTML;
//# sourceMappingURL=index.js.map