import { Printer } from "../printer";
import { Node } from "../parser";
export declare type PrintNode = {
    tag: string;
    attr: {
        [key: string]: any;
    };
    children: (PrintNode | string)[];
};
export declare type HTMLPrinter = (tag: string, attr?: {
    [key: string]: any;
}, children?: (PrintNode | string)[]) => any;
export declare function newHTMLPrinters(h: HTMLPrinter): {
    [type: string]: Printer<Node, any, string | PrintNode>;
};
export declare const html: {
    [type: string]: Printer<Node, any, string | PrintNode>;
};
export declare const react: {
    [type: string]: Printer<Node, any, string | PrintNode>;
};
export declare const hyperapp: {
    [type: string]: Printer<Node, any, string | PrintNode>;
};
