/**
 * A rule determines how to match and parse content.
 * The order determines which rules go first (lower goes first).
 * If no order is given, it is assumed to be 0.
 */
export interface Rule<S extends {} = { inline?: boolean }> {
  order?: number;
  match(source: string, state: Readonly<S>, previousMatch: string): undefined | null | RuleCapture;
  parse(
    capture: RuleCapture,
    recusiveParse: (source: string, state: Readonly<S>) => undefined | Node | Array<Node>,
    state: S,
  ): undefined | Node | Array<Node>;
}

/**
 * Either undefined/null or an array of the form
 * [
 *  0: full string of characters matched
 *  1...n: capture groups available to the parse rule 
 * ]
 */
export type RuleCapture = RegExpExecArray | Array<string>;
/**
 * Nodes in the AST are plain objects with at least a key: "type" declaring what
 * kind of node they are.
 */
export type Node = { type: string };

/**
 * A parser-creator.
 * @param Rules A map of rules to use.
 * @returns {function} A function which parses content. 
 */
export function newParser(Rules: Rule[]) {
  const rules = Rules.sort(
    (a, b) => (a.order === b.order ? 0 : (a.order || 0) > (b.order || 0) ? 1 : -1),
  );
  // TODO: preparse source to remove any stupid stuff? (line endings?)
  const parse = function(source: string, state = {}) {
    const result = [];
    let previousCapture = "";
    while (source) {
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const capture = rule.match(source, state, previousCapture);
        if (capture) {
          source = source.substring(capture[0].length);
          const node = rule.parse(capture, parse, state);
          if (Array.isArray(node)) {
            result.push(...node);
          } else if (node != null) {
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
