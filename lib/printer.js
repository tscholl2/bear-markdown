"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newPrinter(printers) {
    return function print(tree, state) {
        if (state === void 0) { state = {}; }
        var output = [];
        for (var i = 0; i < tree.length; i++) {
            var node = tree[i];
            if (!printers.hasOwnProperty(node.type)) {
                throw new Error("no printer for type: " + node.type);
            }
            output.push(printers[node.type](node, print, state));
        }
        return output;
    };
}
exports.newPrinter = newPrinter;
//# sourceMappingURL=printer.js.map