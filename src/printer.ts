import { Node } from "./parser";

/**
 * A Printer determines how to output a certain type node.
 */
export interface Printer<N = Node, S = {}, T = any> {
  (node: N, print: (node: Array<N>, state?: S) => Array<T>, state: S): T;
}

/**
 * newPrinter takes a map from types to printers and returns a
 * printer function that prints a given tree with those printers.
 */
export function newPrinter(printers: { [type: string]: Printer }) {
  return function print(tree: Array<Node>, state = {}): any[] {
    const output: any[] = [];
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (!printers.hasOwnProperty(node.type)) {
        throw new Error(`no printer for type: ${node.type}`);
      }
      output.push(printers[node.type](node, print, state));
    }
    return output;
  };
}

export type PrintNode = {
  tag: string;
  attr: { [key: string]: any };
  children: (PrintNode | string)[];
};

const pk = (n: Node, s: { key?: number }) =>
  Object.assign({}, n.props, s, { key: (s.key = (s.key || 0) + 1) });

const delimiters: any = {
  __: "u",
  _: "em",
  "~~": "s",
  "~": "del",
  "**": "strong",
  "*": "mark",
};

// newNodePrinters is useful for printing Nodes to VirtualNodes in various frameworks like
// React. You should be able to use `newNodePrinters(react.createElement)`.
export function newNodePrinters(
  h: (tag: string, attr?: { [key: string]: any }, children?: (PrintNode | string)[]) => any,
): {
  [type: string]: Printer<Node, any, string | PrintNode>;
} {
  return {
    text: n => n.props!.content,
    table: (n, print, s) => h("table", pk(n, s), print(n.children!, s)),
    tablehead: (n, print, s) => h("thead", pk(n, s), print(n.children!, s)),
    tableheadcolumn: (n, print, s) => h("th", pk(n, s), print(n.children!, s)),
    tablebody: (n, print, s) => h("tbody", pk(n, s), print(n.children!, s)),
    tablerow: (n, print, s) => h("tr", pk(n, s), print(n.children!, s)),
    tablecolumn: (n, print, s) => h("td", pk(n, s), print(n.children!, s)),
    paragraph: (n, print, s) => h("p", pk(n, s), print(n.children!, s)),
    list: (n, print, s) =>
      h(/^\d/.test(n.props!.bullet) ? "ol" : "ul", pk(n, s), print(n.children!, s)),
    listitem: (n, print, s) => h("li", pk(n, s), print(n.children!, s)),
    link: (n, print, s) => h("a", pk(n, s), print(n.children!, s)),
    image: (n, _, s) => h("img", pk(n, s)),
    heading: (n, print, s) => h(`h${n.props!.level}`, pk(n, s), print(n.children!, s)),
    emphasis: (n, print, s) => h(delimiters[n.props!.delimiter], pk(n, s), print(n.children!, s)),
    comment: n => `<!--${n.props!.content}-->`,
    code: (n, _, s) =>
      n.props!.display === "inline"
        ? h("code", pk(n, s), [n.props!.content.trim()])
        : h("pre", pk(n, s), [h("code", pk(n, s), [n.props!.content.trim()])]),
    blockquote: (n, print, s) => h("blockquote", pk(n, s), print(n.children!, s)),
    math: (n, _, s) => h("math", pk(n, s), [n.props!.content.trim()]),
  };
}
