import { Rule } from "../parser";

import blockQuote from "./block-quote";
import blockCode from "./block-code";
import comment from "./comment";
import emphasis from "./emphasis";
import escape from "./escape";
import heading from "./heading";
import image from "./image";
import inlineCode from "./inline-code";
import link from "./link";
import list from "./list";
// import inlineMath from "./inline-math";
// import blockMath from "./block-math";
import paragraph from "./paragraph";
import table from "./table";
import text from "./text";
import newline from "./newline";

export const defaultRules: Rule[] = [
  // ANY
  Object.assign({}, comment, { order: 0 }),
  // BLOCKS
  Object.assign({}, newline, { order: 1 }),
  Object.assign({}, blockQuote, { order: 2 }),
  Object.assign({}, heading, { order: 3 }),
//  Object.assign({}, blockMath, { order: 4 }),
  Object.assign({}, blockCode, { order: 5 }),
  Object.assign({}, list, { order: 6 }),
  Object.assign({}, table, { order: 7 }),
  Object.assign({}, paragraph, { order: 8 }),
  // INLINE
 //  Object.assign({}, inlineMath, { order: 9 }),
  Object.assign({}, escape, { order: 10 }),
  Object.assign({}, inlineCode, { order: 11 }),
  Object.assign({}, emphasis, { order: 12 }), // emphasis should be after list cause could start with * in sublist
  Object.assign({}, image, { order: 13 }),
  Object.assign({}, link, { order: 14 }), // link must be after image because link is subset of image match
  Object.assign({}, text, { order: 15 }),
];
