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
export declare function newPrinter(printers: {
    [type: string]: Printer;
}): (tree: Node[], state?: {}) => any[];
export declare type PrintNode = {
    tag: string;
    attr: {
        [key: string]: any;
    };
    children: (PrintNode | string)[];
};
export declare function newNodePrinters(h: (tag: string, attr?: {
    [key: string]: any;
}, children?: (PrintNode | string)[]) => any): {
    [type: string]: Printer<Node, any, string | PrintNode>;
};
