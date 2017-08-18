import { Printer } from "../printer";
import { Node } from "../parser";

function h(
  tag: string,
  props: { [key: string]: any } = {},
  children: (string | Comment | HTMLElement)[] = [],
) {
  const attr = Object.keys(props).reduce((p, n) => p + ` "${n}"="${props![n]}"`, "");
  return `<${tag}${attr.trim()}>${children.join("")}</${tag}>`;
}

export default <{
  [type: string]: Printer<Node, any, HTMLElement | string | Comment>;
}>{
  text: (n: any) => n.props.content,
  table: (n: any, output) => h("table", undefined, output(n.children)),
  tablehead: (n: any, output) => h("thead", undefined, output(n.children)),
  tableheadcolumn: (n: any, output) => h("th", n.props, output(n.children)),
  tablebody: (n: any, output) => h("tbody", undefined, output(n.children)),
  tablerow: (n: any, output) => h("tr", undefined, output(n.children)),
  tablecolumn: (n: any, output) => h("td", undefined, output(n.children)),
  paragraph: (n: any, output) => h("p", undefined, output(n.children)),
  list: (n: any, output) =>
    h(/^\d/.test(n.props.bullet) ? "ol" : "ul", undefined, output(n.children)),
  listitem: (n: any, output) => h("li", undefined, output(n.children)),
  link: (n: any, output) => h("a", n.props, output(n.children)),
  image: (n: any) => h("img", n.props),
  heading: (n: any, output) => h(`h${n.props.level}`, undefined, output(n.children)),
  emphasis: (n: any, output) => {
    const delimiters: any = { __: "u", _: "em", "~~": "s", "~": "em", "**": "strong", "*": "mark" };
    return h(delimiters[n.delimiter], undefined, output(n.children));
  },
  comment: (n: any) => `<!--${n.props.content}-->`,
  code: (n: any) =>
    n.props.display === "inline"
      ? h("code", undefined, n.props.content)
      : h("pre", undefined, [h("code", undefined, [n.props.content])]),
  blockquote: (n: any, output) => h("blockquote", undefined, output(n.children)),
  math: (n: any) => h("math", undefined, n.props.content),
};
