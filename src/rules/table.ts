import { Rule } from "../parser";

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
const tableRowRE = /^\s*\|((?:[^\|\n]+\|)+)\s*(?=\n|$)/;
// an alignment row is
// "|" then a repeat(":---:" then a "|") followed by a newline
// where the ":" are optional and there can be many/few "-"'s
const tableAlignRE = /^\s*\|((?:\s*:?\-+:?\s*\|)+)\s*(?=\n)/;

export default <Rule>{
  match: (source, { inline }) => {
    if (inline) {
      return;
    }
    const head = tableRowRE.exec(source);
    if (!head) {
      return;
    }
    let match = head[0] + "\n";
    source = source.substr(head[0].length + 1);
    const align = tableAlignRE.exec(source);
    if (!align) {
      return;
    }
    match += align[0] + "\n";
    source = source.substr(align[0].length + 1);
    const rows: RegExpExecArray[] = [];
    while (tableRowRE.test(source)) {
      rows.push(tableRowRE.exec(source)!);
      match += rows[rows.length - 1][0] + "\n";
      source = source.substr(rows[rows.length - 1][0].length + 1);
    }
    if (rows.length === 0) {
      return;
    }
    return [match, head[0], align[0], ...rows.map(r => r[0])];
  },
  parse: (capture, parse, state) => {
    const align = capture[2]
      .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
      .split(/\s*\|\s*/) // split on |'s
      .map(a => {
        const left = a.startsWith(":");
        const right = a.endsWith(":");
        return left === right ? "center" : left ? "left" : "right";
      });
    return {
      type: "table",
      children: [
        {
          type: "tablehead",
          children: capture[1]
            .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
            .split(/\s*\|\s*/) // split on |'s
            .map((c, i) => ({
              type: "tableheadcolumn",
              props: { align: align[i] },
              children: parse(c, Object.assign({}, state, { inline: true })),
            })),
        },
        {
          type: "tablebody",
          children: capture.slice(3).map(r => ({
            type: "tablerow",
            children: r
              .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
              .split(/\s*\|\s*/) // split on |'s
              .map(c => ({
                type: "tablecolumn",
                children: parse(c, Object.assign({}, state, { inline: true })),
              })),
          })),
        },
      ],
    };
  },
};
