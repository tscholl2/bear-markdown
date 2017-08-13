export function printHTML(tree: any[] = [], state: any = {}) {
  return tree.map(n => {
    switch (n.type) {
      case "text":
        return document.createTextNode(n.content);
      case "table":
        const table = document.createElement("table");
        const head = document.createElement("thead");
        n.head.forEach((d: any, i: number) => {
          const th = document.createElement("th");
          th.align = n.align[i];
          printHTML(d, state).forEach((c: any) => th.appendChild(c));
          head.appendChild(th);
        });
        table.appendChild(head);
        const body = document.createElement("tbody");
        n.rows.forEach((r: any) => {
          const row = document.createElement("tr");
          printHTML(r, state).forEach((c: any) => row.appendChild(c));
          body.appendChild(row);
        });
        table.appendChild(body);
        return table;
      case "paragraph":
        const p = document.createElement("p");
        printHTML(n.children, state).forEach((c: any) => p.appendChild(c));
        return p;
      case "list":
        const l = document.createElement(/^\d/.test(n.bullet) ? "ol" : "ul");
        n.items.forEach((item: any) => {
          const i = document.createElement("li");
          printHTML(item, state).forEach((c: any) => i.appendChild(c));
          l.appendChild(i);
        });
        return l;
      case "link":
        const a = document.createElement("a");
        a.href = n.href;
        printHTML(n.children, state).forEach((c: any) => a.appendChild(c));
        return a;
      case "image":
        const i = document.createElement("img");
        i.alt = n.alt;
        i.src = n.src;
        i.title = n.title;
        return i;
      case "heading":
        const h = document.createElement(`h${n.level}`);
        printHTML(n.children, state).forEach((c: any) => h.appendChild(c));
        return h;
      case "emphasis":
        const delimiters: { [key: string]: string } = {
          __: "u",
          _: "em",
          "~~": "s",
          "~": "em",
          "**": "strong",
          "*": "mark",
        };
        const e = document.createElement(delimiters[n.delimiter]);
        printHTML(n.children, state).forEach((c: any) => e.appendChild(c));
        return e;
      case "comment":
        return document.createComment(n.content);
      case "codeBlock":
        const pr = document.createElement("pre");
        const c = document.createElement("code");
        c.appendChild(document.createTextNode(n.content));
        pr.appendChild(c);
        return pr;
      case "blockQuote":
        const bq = document.createElement("blockquote");
        printHTML(n.children, state).forEach((c: any) => bq.appendChild(c));
        return bq;
      case "inlineCode":
        const cd = document.createElement("code");
        cd.appendChild(document.createTextNode(n.content));
        return cd;
      default:
        throw new Error(`unimplemented node: ${n.type}`);
    }
  });
}
