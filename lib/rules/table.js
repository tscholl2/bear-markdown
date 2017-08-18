"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Example:

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

A table is a:

- table row
- table alignment
- table row
- table row
- ...
- table row
*/
// a row is
// "|" then repeat("not a |" then a "|") followed by a newline or EOF
var tableRowRE = /^s*\|((?:[^\|\n]+\|)+)\s*(?=\n|$)/;
// an alignment row is
// "|" then a repeat(":---:" then a "|") followed by a newline
// where the ":" are optional and there can be many/few "-"'s
var tableAlignRE = /^\s*\|((?:\s*:?\-+:?\s*\|)+)\s*(?=\n)/;
exports.default = {
    match: function (source, _a) {
        var inline = _a.inline;
        if (inline) {
            return;
        }
        var head = tableRowRE.exec(source);
        if (!head) {
            return;
        }
        var match = head[0] + "\n";
        source = source.substr(head[0].length + 1);
        var align = tableAlignRE.exec(source);
        if (!align) {
            return;
        }
        match += align[0] + "\n";
        source = source.substr(align[0].length + 1);
        var rows = [];
        while (tableRowRE.test(source)) {
            rows.push(tableRowRE.exec(source));
            match += rows[rows.length - 1][0] + "\n";
            source = source.substr(rows[rows.length - 1][0].length + 1);
        }
        if (rows.length === 0) {
            return;
        }
        return [match, head[0], align[0]].concat(rows.map(function (r) { return r[0]; }));
    },
    parse: function (capture, parse, state) {
        var align = capture[2]
            .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
            .split(/\s*\|\s*/) // split on |'s
            .map(function (a) {
            var left = a.startsWith(":");
            var right = a.endsWith(":");
            return left === right ? "center" : left ? "left" : "right";
        });
        return {
            tag: "table",
            children: [
                {
                    tag: "tablehead",
                    children: capture[1]
                        .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
                        .split(/\s*\|\s*/) // split on |'s
                        .map(function (c, i) { return ({
                        tag: "tableheadcolumn",
                        props: { align: align[i] },
                        children: parse(c, Object.assign({}, state, { inline: true })),
                    }); }),
                },
                {
                    tag: "tablebody",
                    children: capture.slice(3).map(function (r) { return ({
                        tag: "tablerow",
                        children: r
                            .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
                            .split(/\s*\|\s*/) // split on |'s
                            .map(function (c) { return ({
                            tag: "tablecolumn",
                            children: parse(c, Object.assign({}, state, { inline: true })),
                        }); }),
                    }); }),
                },
            ],
        };
    },
};
//# sourceMappingURL=table.js.map