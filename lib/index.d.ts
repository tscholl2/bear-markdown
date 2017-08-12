import { newParser } from "./parser";
import { defaultRules } from "./rules";
export { newParser, defaultRules };
export declare const defaultParser: (source: string, state?: {}) => {
    type: string;
}[];
