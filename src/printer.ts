import { Node } from "./parser";

/**
 * A Printer determines how to output a certain type node.
 */
export interface Printer<N = Node, S = {}, T = any> {
  (node: N, output: (node: Array<N>, state?: S) => Array<T>, state: S): T;
}

export function newPrinter(printers: { [type: string]: Printer }) {
  return function print(tree: Array<Node>, state = {}): any[] {
    return tree.map(node => {
      if (!printers.hasOwnProperty(node.type)) {
        throw new Error(`no printer for type ${node.type}`);
      }
      return printers[node.type](node, print, state);
    });
  };
}
