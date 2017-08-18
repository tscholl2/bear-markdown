import { newParser, Node } from "./parser";
import { defaultRules } from "./rules";
export { newParser, defaultRules, Node };
export declare const defaultParser: (source: string, state?: {}) => Node[];
export declare const defaultHTMLPrinter: (tree: Node[], state?: {}) => any[];
