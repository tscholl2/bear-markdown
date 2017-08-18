import { Node } from "./parser";

/**
 * A Printer determines how to output a certain type node.
 */
export interface Printer<N = Node, S = {}, T = any> {
  (node: N, output: (node: Array<N>, state?: S) => Array<T>, state: S): T;
}

export function newPrinter(printers: { [type: string]: Printer }) {
  return function print(tree: Array<Node>, state = {}): any[] {
    return tree.map(n => {
      const node = typeof n === "string" ? { tag: "text", props: { content: n } } : n;
      if (!printers.hasOwnProperty(node.tag)) {
        throw new Error(`no printer for tag ${node.tag}`);
      }
      return printers[node.tag](node, print, state);
    });
  };
}
