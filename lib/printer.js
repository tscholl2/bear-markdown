"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newPrinter(printers) {
    return function print(tree, state) {
        if (state === void 0) { state = {}; }
        return tree.map(function (node) {
            if (!printers.hasOwnProperty(node.type)) {
                throw new Error("no printer for type " + node.type);
            }
            return printers[node.type](node, print, state);
        });
    };
}
exports.newPrinter = newPrinter;
//# sourceMappingURL=printer.js.map