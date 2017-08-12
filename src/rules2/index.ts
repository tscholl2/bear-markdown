import { Rule } from "../parser";

// import blockQuote from "./block-quote";
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
  // blockQuote,
  { ...newline, order: 1 },
  { ...heading, order: 2 },
  { ...codeBlock, order: 3 },
  { ...list, order: 4 },
  { ...table, order: 5 },
  { ...paragraph, order: 6 },
  // INLINE
  { ...inlineCode, order: 7 },
  { ...escape, order: 8 },
  { ...emphasis, order: 9 },
  { ...image, order: 10 },
  { ...link, order: 11 }, // link must be after image because they start the same
  { ...text, order: 12 },
];
