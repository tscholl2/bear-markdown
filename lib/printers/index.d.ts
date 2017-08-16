import { PrintRule } from "../printer";
import { Node } from "../parser";
export declare const printers: {
    [type: string]: {
        html: PrintRule<Node, any, HTMLElement | Text | Comment>;
    };
};
