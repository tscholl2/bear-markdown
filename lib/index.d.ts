import { newParser, Node } from "./parser";
import { newPrinter } from "./printer";
import { defaultRules } from "./rules";
export declare const defaultParser: (source: string, state?: {}) => Node[];
export declare const defaultHTMLPrinter: (tree: Node[], state?: {}) => any[];
export { newParser, newPrinter, defaultRules };
export { Rule, Node } from "./parser";
export { newHTMLPrinters } from "./printers";
export { Printer } from "./printer";
