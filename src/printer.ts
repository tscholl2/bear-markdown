import { Node } from "./parser";

/**
 * A Printer determines how to output a certain type node.
 */
export interface Printer<N = Node, S = {}, T = any> {
  (node: N, print: (node: Array<N>, state?: S) => Array<T>, state: S): T;
}

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
