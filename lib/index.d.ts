import { newParser, Node } from "./parser";
import { defaultRules } from "./rules";
export { printHTML } from "./html-printer";
export { newParser, defaultRules };
export declare const defaultParser: (markdown: string) => Node[];
