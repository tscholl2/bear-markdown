"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newPrinter(printers) {
    var output = [];
    function print(tree, state) {
        if (state === void 0) { state = {}; }
        for (var i = 0; i < tree.length; i++) {
            var node = tree[i];
            if (!printers.hasOwnProperty(node.type)) {
                throw new Error("no printer for type " + node.type);
            }
            output.push(printers[node.type](node, state, print));
        }
        return output;
    }
    return print;
}
exports.newPrinter = newPrinter;
//# sourceMappingURL=printer.js.map