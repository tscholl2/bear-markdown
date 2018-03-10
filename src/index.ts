import { newParser, Node } from "./parser";
import { newPrinter } from "./printer";
import { defaultRules } from "./rules";
import { html } from "./printers";

export const defaultParser = newParser(defaultRules);
export const defaultHTMLPrinter = newPrinter(html);

export { newParser, newPrinter, defaultRules };
export { Rule, Node } from "./parser";
export { newHTMLPrinters } from "./printers";
export { Printer } from "./printer";
