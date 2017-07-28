import { Rule } from "../parser";

import blockQuote from "./block-quote";
import br from "./br";
import codeBlock from "./code-block";
import comment from "./comment";
import del from "./del";
import em from "./em";
import heading from "./heading";
import hr from "./hr";
import image from "./image";
import inlineCode from "./inline-code";
import link from "./link";
import list from "./list";
import newline from "./newline";
import paragraph from "./paragraph";
import strong from "./strong";
import table from "./table";
import text from "./text";
import u from "./u";

export const defaultRules: Rule[] = [
  blockQuote,
  br,
  codeBlock,
  comment,
  del,
  em,
  heading,
  hr,
  image,
  inlineCode,
  link,
  list,
  newline,
  paragraph,
  strong,
  table,
  text,
  u,
];
