import { newParser, Node } from "./parser";
import { newPrinter } from "./printer";
import { defaultRules } from "./rules";
export { newParser, defaultRules, Node };
export { newPrinter };
export declare const defaultParser: (source: string, state?: {}) => Node[];
export declare const defaultHTMLPrinter: (tree: Node[], state?: {}) => any[];
