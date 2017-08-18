import { newParser } from "./parser";
import { defaultRules } from "./rules";
export { newParser, defaultRules };
export declare const defaultParser: (source: string, state?: {}) => (string | {
    tag: string;
    props?: {
        [key: string]: any;
    } | undefined;
    children?: (string | any)[] | undefined;
})[];
export declare const defaultHTMLPrinter: (tree: (string | {
    tag: string;
    props?: {
        [key: string]: any;
    } | undefined;
    children?: (string | any)[] | undefined;
})[], state?: {}) => any[];
