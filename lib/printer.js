"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newPrinter(printers) {
    return function print(tree, state) {
        if (state === void 0) { state = {}; }
        return tree.map(function (node) {
            if (!printers.hasOwnProperty(node.tag)) {
                throw new Error("no printer for tag " + node.tag);
            }
            return printers[node.tag](node, print, state);
        });
    };
}
exports.newPrinter = newPrinter;
//# sourceMappingURL=printer.js.map