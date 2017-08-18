import { Node } from "./parser";
/**
 * A Printer determines how to output a certain type node.
 */
export interface Printer<N = Node, S = {}, T = any> {
    (node: N, output: (node: Array<N>, state?: S) => Array<T>, state: S): T;
}
export declare function newPrinter(printers: {
    [type: string]: Printer;
}): (tree: Node[], state?: {}) => any[];
