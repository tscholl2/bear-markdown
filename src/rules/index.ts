import { Rule } from "../parser";

import blockQuote from "./block-quote";
import codeBlock from "./code-block";
import comment from "./comment";
import emphasis from "./emphasis";
import escape from "./escape";
import heading from "./heading";
import image from "./image";
import inlineCode from "./inline-code";
import link from "./link";
import list from "./list";
import inlineMath from "./inline-math";
import blockMath from "./block-math";
import paragraph from "./paragraph";
import table from "./table";
import text from "./text";
import newline from "./newline";

export const defaultRules: Rule[] = [
  // ANY
  { ...comment, order: 0 },
  // BLOCKS
  { ...newline, order: 1 },
  { ...blockQuote, order: 2 },
  { ...heading, order: 3 },
  { ...blockMath, order: 4 },
  { ...codeBlock, order: 5 },
  { ...list, order: 6 },
  { ...table, order: 7 },
  { ...paragraph, order: 8 },
  // INLINE
  { ...escape, order: 9 },
  { ...inlineCode, order: 10 },
  { ...inlineMath, order: 11 },
  { ...emphasis, order: 12 }, // emphasis should be after list cause could start with * in sublist
  { ...image, order: 13 },
  { ...link, order: 14 }, // link must be after image because link is subset of image match
  { ...text, order: 15 },
];
