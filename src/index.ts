import { newParser, Node } from "./parser";
import { newPrinter } from "./printer";
import { html } from "./printers";
import { defaultRules } from "./rules";
export { newParser, defaultRules, Node };
export { newPrinter };
export { newHTMLPrinters } from "./printers";

export const defaultParser = newParser(defaultRules);
export const defaultHTMLPrinter = newPrinter(html);
