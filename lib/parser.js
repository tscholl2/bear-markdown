"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A parser-creator.
 * @param Rules A map of rules to use.
 * @returns {function} A function which parses content.
 */
function newParser(Rules) {
    var rules = Rules.sort(function (a, b) { return (a.order === b.order ? 0 : a.order > b.order ? 1 : -1); });
    // TODO: preparse source to remove any stupid stuff? (line endings?)
    var parse = function (source, state) {
        if (state === void 0) { state = {}; }
        var result = [];
        var previousCapture = "";
        while (source) {
            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                var capture = rule.match(source, state, previousCapture);
                if (capture) {
                    source = source.substring(capture[0].length);
                    var node = rule.parse(capture, parse, state);
                    if (Array.isArray(node)) {
                        result.push.apply(result, node);
                    }
                    else if (node != null) {
                        result.push(node);
                    }
                    previousCapture = capture[0];
                    break;
                }
                if (i === rules.length - 1) {
                    throw new Error("could not find rule to match content: " + JSON.stringify(source));
                }
            }
        }
        return result;
    };
    return parse;
}
exports.newParser = newParser;
//# sourceMappingURL=parser.js.map