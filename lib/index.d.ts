import { newParser, Node, Rule } from "./parser";
import { newPrinter, Printer, newNodePrinters } from "./printer";
import { defaultRules } from "./rules";
export declare const defaultParser: (source: string, state?: {}) => Node[];
export declare const defaultHTMLPrinter: (tree: Node[], state?: {}) => any[];
export { Node, Rule, Printer, newParser, newPrinter, defaultRules, newNodePrinters };
