import { Node } from "./parser";
/**
 * A PrintRule determines how to output a certain type node.
 */
export interface PrintRule<N = Node, S = {}, T = any> {
    (node: N, state: S, output: (node: Array<N>, state?: S) => Array<T>): T;
}
export declare function newPrinter(printers: {
    [type: string]: PrintRule;
}): (tree: Node[], state?: {}) => any[];
