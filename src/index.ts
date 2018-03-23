import { newParser, Node, Rule } from "./parser";
import { newPrinter, Printer, newNodePrinters } from "./printer";
import { defaultRules } from "./rules";

export const defaultParser = newParser(defaultRules);
export const defaultHTMLPrinter = newPrinter(
  newNodePrinters((tag, attr = {}, children = []) => {
    let a = "";
    for (let key in attr) {
      if (key != "id") {
        a += ` "${key}"="${attr[key]}"`;
      }
    }
    return `<${tag}${a}>${children.join("")}</${tag}>`;
  }),
);

export { Node, Rule, Printer, newParser, newPrinter, defaultRules, newNodePrinters };
