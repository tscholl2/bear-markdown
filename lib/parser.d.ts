/**
 * A rule determines how to match and parse content.
 * The order determines which rules go first (lower goes first).
 * If no order is given, it is assumed to be 0.
 */
export interface Rule<S extends {} = {
    inline?: boolean;
}> {
    order?: number;
    match(source: string, state: Readonly<S>, previousMatch: string): undefined | null | RuleCapture;
    parse(capture: RuleCapture, recusiveParse: (source: string, state: Readonly<S>) => undefined | Array<Node>, state: S): undefined | Node | Array<Node>;
}
/**
 * Either undefined/null or an array of the form
 * [
 *  0: full string of characters matched
 *  1...n: capture groups available to the parse rule
 * ]
 */
export declare type RuleCapture = RegExpExecArray | Array<string>;
/**
 * Nodes in the AST are plain objects with at least a key: `type` declaring what
 * kind of node they are. A `string` node is a shortcut for {type: "text", props: {content: "..."}}
 */
export declare type Node = {
    type: string;
    props?: {
        [key: string]: any;
    };
    children?: Node[];
};
/**
 * A parser-creator.
 * @param Rules A map of rules to use.
 * @returns {function} A function which parses content.
 */
export declare function newParser(Rules: Rule[]): (source: string, state?: {}) => Node[];
