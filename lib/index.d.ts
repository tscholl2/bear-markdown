import { Node } from "./parser";
export declare const defaultParser: (source: string, state?: {}) => Node[];
export declare const defaultHTMLPrinter: (tree: Node[], state?: {}) => any[];
export { newParser, Rule, Node } from './parser';
export { newHTMLPrinters } from "./printers";
export { Printer } from './printer';
export { defaultRules } from './rules';
