import { Printer } from "../printer";
import { Node } from "../parser";

export type PrintNode = {
  tag: string;
  attr: { [key: string]: any };
  children: (PrintNode | string)[];
};

export type HTMLPrinter = (
  tag: string,
  attr?: { [key: string]: any },
  children?: (PrintNode | string)[],
) => any;

const inc = (s: { id?: number }) => {
  s.id = (s.id || 0) + 1;
  return s.id;
};

export function newHTMLPrinters(
  h: HTMLPrinter,
): {
  [type: string]: Printer<Node, any, string | PrintNode>;
} {
  return {
    text: n => n.props!.content,
    table: (n, print, s) => h("table", { id: inc(s) }, print(n.children!, s)),
    tablehead: (n, print, s) => h("thead", { id: inc(s) }, print(n.children!, s)),
    tableheadcolumn: (n, print, s) =>
      h("th", Object.assign({}, n.props, { id: inc(s) }), print(n.children!, s)),
    tablebody: (n, print, s) => h("tbody", { id: inc(s) }, print(n.children!, s)),
    tablerow: (n, print, s) => h("tr", { id: inc(s) }, print(n.children!, s)),
    tablecolumn: (n, print, s) => h("td", { id: inc(s) }, print(n.children!, s)),
    paragraph: (n, print, s) => h("p", { id: inc(s) }, print(n.children!, s)),
    list: (n, print, s) =>
      h(/^\d/.test(n.props!.bullet) ? "ol" : "ul", { id: inc(s) }, print(n.children!, s)),
    listitem: (n, print, s) => h("li", { id: inc(s) }, print(n.children!, s)),
    link: (n, print, s) =>
      h("a", Object.assign({}, n.props, { id: inc(s) }), print(n.children!, s)),
    image: (n, _, s) => h("img", Object.assign({}, n.props, { id: inc(s) })),
    heading: (n, print, s) => h(`h${n.props!.level}`, { id: inc(s) }, print(n.children!, s)),
    emphasis: (n, print, s) => {
      const delimiters: any = {
        __: "u",
        _: "em",
        "~~": "s",
        "~": "em",
        "**": "strong",
        "*": "mark",
      };
      return h(delimiters[n.props!.delimiter], { id: inc(s) }, print(n.children!, s));
    },
    comment: n => `<!--${n.props!.content}-->`,
    code: (n, _, s) =>
      n.props!.display === "inline"
        ? h("code", { id: inc(s) }, [n.props!.content])
        : h("pre", { id: inc(s) }, [h("code", { id: inc(s) }, [n.props!.content])]),
    blockquote: (n, print, s) => h("blockquote", { id: inc(s) }, print(n.children!, s)),
    math: (n, _, s) => h("math", { id: inc(s) }, n.props!.content),
  };
}

export const html = newHTMLPrinters((tag, attr = {}, children = []) => {
  let a = "";
  for (let key in attr) {
    if (attr.hasOwnProperty(key) && key != "id") {
      a += ` "${key}"="${attr[key]}"`;
    }
  }
  return `<${tag}${a}>${children.join("")}</${tag}>`;
});

// export const react = newHTMLPrinters((tag, attr = {}, children = []) => {});
