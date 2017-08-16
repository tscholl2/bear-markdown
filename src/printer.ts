import { Node } from "./parser";

/**
 * A PrintRule determines how to output a certain type node.
 */
export interface PrintRule<N = Node, S = {}, T = any> {
  (node: N, state: S, output: (node: Array<N>, state?: S) => Array<T>): T;
}

export function newPrinter(printers: { [type: string]: PrintRule }) {
  return function print(tree: Array<Node>, state = {}) {
    const output: any[] = [];
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (!printers.hasOwnProperty(node.type)) {
        throw new Error(`no printer for type ${node.type}`);
      }
      output.push(printers[node.type](node, state, print));
    }
    return output;
  };
}
