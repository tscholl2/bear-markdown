import { PrintRule } from "../printer";
import { Node } from "../parser";

export const printers: {
  [type: string]: { html: PrintRule<Node, any, HTMLElement | Text | Comment> };
} = {
  text: {
    html: (n: any) => document.createTextNode(n.content),
  },
  table: {
    html: (n: any, s, output) => {
      const table = document.createElement("table");
      const head = document.createElement("thead");
      output(n.head).forEach((c, i) => {
        const th = document.createElement("th");
        th.align = n.align[i];
        th.appendChild(c);
        head.appendChild(th);
      });
      table.appendChild(head);
      const body = document.createElement("tbody");
      (n.rows as any[]).map((r: any) => output(r, s)).forEach(r => {
        const row = document.createElement("tr");
        r.forEach(c => row.appendChild(c));
        body.appendChild(row);
      });
      table.appendChild(body);
      return table;
    },
  },
  paragraph: {
    html: (n: any, s, output) => {
      const p = document.createElement("p");
      output(n.children, s).forEach((c: any) => p.appendChild(c));
      return p;
    },
  },
  list: {
    html: (n: any, s, output) => {
      const l = document.createElement(/^\d/.test(n.bullet) ? "ol" : "ul");
      (n.items as any[]).forEach(item => {
        const i = document.createElement("li");
        output(item, s).forEach((c: any) => i.appendChild(c));
        l.appendChild(i);
      });
      return l;
    },
  },
  link: {
    html: (n: any, s, output) => {
      const a = document.createElement("a");
      a.href = n.href;
      output(n.children, s).forEach((c: any) => a.appendChild(c));
      return a;
    },
  },
  image: {
    html: (n: any) => {
      const i = document.createElement("img");
      i.alt = n.alt;
      i.src = n.src;
      i.title = n.title;
      return i;
    },
  },
  heading: {
    html: (n: any, s, output) => {
      const h = document.createElement(`h${n.level}`);
      output(n.children, s).forEach((c: any) => h.appendChild(c));
      return h;
    },
  },
  emphasis: {
    html: (n: any, s, output) => {
      const delimiters: { [key: string]: string } = {
        __: "u",
        _: "em",
        "~~": "s",
        "~": "em",
        "**": "strong",
        "*": "mark",
      };
      const e = document.createElement(delimiters[n.delimiter]);
      output(n.children, s).forEach((c: any) => e.appendChild(c));
      return e;
    },
  },
  comment: {
    html: (n: any) => document.createComment(n.content),
  },
  codeBlock: {
    html: (n: any) => {
      const pr = document.createElement("pre");
      const c = document.createElement("code");
      c.appendChild(document.createTextNode(n.content));
      pr.appendChild(c);
      return pr;
    },
  },
  blockQuote: {
    html: (n: any, s, output) => {
      const bq = document.createElement("blockquote");
      output(n.children, s).forEach((c: any) => bq.appendChild(c));
      return bq;
    },
  },
  inlineCode: {
    html: (n: any) => {
      const cd = document.createElement("code");
      cd.appendChild(document.createTextNode(n.content));
      return cd;
    },
  },
};
