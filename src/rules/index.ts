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
  { ...codeBlock, order: 4 },
  { ...list, order: 5 },
  { ...table, order: 6 },
  { ...paragraph, order: 7 },
  // INLINE
  { ...inlineCode, order: 8 },
  { ...escape, order: 9 },
  { ...emphasis, order: 10 }, // emphasis should be after list cause could start with * in sublist
  { ...image, order: 6 }, // should be before paragraph because image can be block
  { ...link, order: 12 }, // link must be after image because link is subset of image match
  { ...text, order: 13 },
];
