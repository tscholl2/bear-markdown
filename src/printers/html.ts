import { Printer } from "../printer";
import { Node } from "../parser";

function h(
  tag: string,
  props?: { [key: string]: any },
  ...children: (string | Comment | HTMLElement)[]
) {
  // return { tag, props, children };
  const attr = Object.keys(props || {}).reduce(
    (p, n) => `${p} "${n}"=${JSON.stringify(props![n])}`,
    "",
  );
  console.log("children = ", children);
  return `<${tag}${attr ? " " + attr : ""}>${children.join("")}</${tag}>`;
}

export default <{
  [type: string]: Printer<Node, any, HTMLElement | string | Comment>;
}>{
  text: (n: any) => n.props.content,
  table: (n: any, output) => h("table", undefined, ...output(n.children)),
  tablehead: (n: any, output) => h("thead", undefined, ...output(n.children)),
  tableheadcolumn: (n: any, output) => h("th", undefined, ...output(n.children)),
  tablebody: (n: any, output) => h("tbody", undefined, ...output(n.children)),
  tablerow: (n: any, output) => h("tr", undefined, ...output(n.children)),
  tablecolumn: (n: any, output) => h("td", undefined, ...output(n.children)),
  paragraph: (n: any, output) =>
    console.log("CHILDREN = ", n.children) || h("p", undefined, ...output(n.children)),
  list: (n: any, output) =>
    h(
      /^\d/.test(n.props.bullet) ? "ol" : "ul",
      undefined,
      n.items.map((i: any) => h("li", undefined, ...output(i))),
    ),
  link: (n: any, output) => h("a", n.props, ...output(n.children)),
  image: (n: any, output) => h("img", n.props, ...output(n.children)),
  heading: (n: any, output) => h(`h${n.level}`, undefined, ...output(n.children)),
  emphasis: (n: any, output) => {
    const delimiters: any = { __: "u", _: "em", "~~": "s", "~": "em", "**": "strong", "*": "mark" };
    return h(delimiters[n.delimiter], undefined, ...output(n.children));
  },
  comment: (n: any) => `<!--${n.props.content}-->`,
  blockcode: (n: any, output) => h("pre", undefined, h("code", undefined, ...output(n.children))),
  blockquote: (n: any, output) => h("blockquote", undefined, ...output(n.children)),
  inlinecode: (n: any, output) => h("code", undefined, ...output(n.children)),
  blockMath: (n: any, output) => h("math", undefined, ...output(n.children)),
  math: (n: any, output) => h("math", undefined, ...output(n.children)),
};
