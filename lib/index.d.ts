import { newParser } from "./parser";
import { newPrinter } from "./printer";
import { defaultRules } from "./rules";
export { newParser, defaultRules };
export { newPrinter };
export declare const defaultParser: (source: string, state?: {}) => {
    type: string;
}[];
export declare const defaultHTMLPrinter: (tree: {
    type: string;
}[], state?: {}) => any[];
