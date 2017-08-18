import { Rule } from "../parser";

const listItemRE = new RegExp(
  // a list item can start with an arbitrary indent
  "^( *)" +
    // followed by a bullet
    "([\\*\\-\\+]|\\d+\\.)" +
    // followed by a space
    "\\s" +
    // followed by anything
    "([\\s\\S]*?)" +
    // until EOF, 2 newlines, or the same indent and a bullet
    // note: different bullet means different list
    "(?=$|\\n\\n|\\n\\1(?:[\\*\\-\\+]|\\d+\\.))",
);

export default <Rule<{ inline: boolean; _list?: boolean }>>{
  match: (source, { inline, _list }, previousMatch) => {
    // all list items must begin on a new line
    if (previousMatch && !previousMatch.endsWith("\n")) {
      return;
    }
    // if we are inside a list and previous match is empty, then we are not on a newline
    // so we return. That is: "1. * a" is not a list in a list
    if (_list && previousMatch === "") {
      return;
    }
    // a list must be either a new block or inline inside a list (e.g. a sublist)
    if (inline && !_list) {
      return;
    }
    let match = "";
    let bullet = "";
    const items = [];
    // while there is another list item
    while (listItemRE.test(source)) {
      // capture is of the form:
      // [
      //   full match,
      //   indent,
      //   bullet,
      //   item content,
      // TODO: add in pre-item stuff to know if was preceded by \n\n, or just \n
      // ]
      const capture = listItemRE.exec(source)!;
      if (capture && bullet !== "" && capture[2] !== bullet) {
        break;
      }
      if (bullet === "") {
        bullet = capture[2];
      }
      match += capture[0];
      source = source.substr(capture[0].length);
      // if we saw 2 newlines and there is another list item (with the same indent),
      // then skip over the newlines
      if (source.startsWith("\n\n") && listItemRE.test(source.substr(2))) {
        match += "\n\n";
        source = source.substr(2);
      }
      // same for 1 newline
      if (source.startsWith("\n") && listItemRE.test(source.substr(1))) {
        match += "\n";
        source = source.substr(1);
      }
      items.push(capture);
    }
    if (items.length === 0) {
      return;
    }
    return [match, ...items];
  },
  parse: (capture, parse, state) => {
    return {
      type: "list",
      props: { bullet: capture[1][2] },
      children: capture.slice(1).map(item => {
        let content = item[3]
          // remove all indents on each line
          .replace(new RegExp(`^${item[1]}`, "gm"), "");
        const containsBlock = content.includes("\n\n");
        content = content.trim() + (containsBlock ? "\n\n" : "");
        return {
          type: "listitem",
          children: parse(
            content,
            Object.assign({}, state, { inline: !containsBlock, _list: true }),
          ),
        };
      }),
    };
  },
};
