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

const inc = (s: { key?: number }) => {
  s.key = (s.key || 0) + 1;
  return s.key;
};

const delimiters: any = {
  __: "u",
  _: "em",
  "~~": "s",
  "~": "em",
  "**": "strong",
  "*": "mark",
};

export function newHTMLPrinters(
  h: HTMLPrinter,
): {
  [type: string]: Printer<Node, any, string | PrintNode>;
} {
  return {
    text: n => n.props!.content,
    table: (n, print, s) => h("table", { key: inc(s) }, print(n.children!, s)),
    tablehead: (n, print, s) => h("thead", { key: inc(s) }, print(n.children!, s)),
    tableheadcolumn: (n, print, s) =>
      h("th", Object.assign({}, n.props, { key: inc(s) }), print(n.children!, s)),
    tablebody: (n, print, s) => h("tbody", { key: inc(s) }, print(n.children!, s)),
    tablerow: (n, print, s) => h("tr", { key: inc(s) }, print(n.children!, s)),
    tablecolumn: (n, print, s) => h("td", { key: inc(s) }, print(n.children!, s)),
    paragraph: (n, print, s) => h("p", { key: inc(s) }, print(n.children!, s)),
    list: (n, print, s) =>
      h(/^\d/.test(n.props!.bullet) ? "ol" : "ul", { key: inc(s) }, print(n.children!, s)),
    listitem: (n, print, s) => h("li", { key: inc(s) }, print(n.children!, s)),
    link: (n, print, s) =>
      h("a", Object.assign({}, n.props, { key: inc(s) }), print(n.children!, s)),
    image: (n, _, s) => h("img", Object.assign({}, n.props, { key: inc(s) })),
    heading: (n, print, s) => h(`h${n.props!.level}`, { key: inc(s) }, print(n.children!, s)),
    emphasis: (n, print, s) =>
      h(delimiters[n.props!.delimiter], { key: inc(s) }, print(n.children!, s)),
    comment: n => `<!--${n.props!.content}-->`,
    code: (n, _, s) =>
      n.props!.display === "inline"
        ? h("code", { key: inc(s) }, [n.props!.content])
        : h("pre", { key: inc(s) }, [h("code", { key: inc(s) }, [n.props!.content])]),
    blockquote: (n, print, s) => h("blockquote", { key: inc(s) }, print(n.children!, s)),
    math: (n, _, s) => h("math", { key: inc(s) }, [n.props!.content]),
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

export const react = newHTMLPrinters((type, data = {}, children = []) => ({
  type,
  key: data.key,
  props: Object.assign({ children }, data, { key: undefined }),
}));

export const hyperapp = newHTMLPrinters((tag, data = {}, children = []) => ({
  tag,
  data,
  children,
}));
