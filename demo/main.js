// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function `fn` will be called after it stops being called for
// `N` milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(N, fn, immediate = false) {
  let timeout;
  return function(...args) {
    const later = function() {
      timeout = null;
      if (!immediate) fn(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, N);
    if (callNow) fn(...args);
  };
}

// These are imported from ./bundle.min.js
// parser
const parse = defaultParser;
// printer
const print = defaultHTMLPrinter;
// This is imported from hyperapp.js on unpkg
const { h, app } = hyperapp;

// Components

const Input = ({ value, update }) =>
  h("textarea", {
    class: "main-input",
    oninput: ({ target: { value } }) => update(value),
    value,
    placeholder: "input",
  });

const HTMLPreview = ({ html }) => h("div", { class: "markdown", innerHTML: html });

const TreePreview = ({ tree }) => h("pre", { class: "tree" }, PrintJson(tree));

const PrintJson = json => {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  const html = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function(match) {
        var cls = "number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        return '<span class="' + cls + '">' + match + "</span>";
      },
    );
  return h("div", { innerHTML: html });
};

const Toggle = ({ value, ontoggle, label }) =>
  h("label", undefined, [
    h("input", {
      type: "checkbox",
      checked: value,
      onchange: ontoggle,
    }),
    label,
  ]);

const Loading = () => h("progress");

const Err = ({ error }) => h("pre", { class: "error" }, `${error}`);

const LeftSide = (state, actions) =>
  h("div", { class: "left-side" }, [
    h("h2", undefined, "Markdown"),
    Input({ value: state.input, update: actions.updateInput }),
  ]);

const RightSide = (state, actions) => {
  let preview;
  if (state.preview === "html") {
    const { html, htmlError } = state.parsed;
    if (html != null) {
      preview = HTMLPreview({ html });
    } else if (htmlError != null) {
      preview = Err({ error: htmlError });
    } else {
      preview = Loading();
    }
  } else {
    const { tree, treeError } = state.parsed;
    if (tree != null) {
      preview = TreePreview({ tree });
    } else if (treeError != null) {
      preview = Err({ error: treeError });
    } else {
      preview = Loading();
    }
  }
  return h("div", { class: "right-side" }, [
    h("h2", undefined, "Preview"),
    h("nav", undefined, [
      h(
        "a",
        {
          onclick: () => actions.update({ preview: "html" }),
          selected: state.preview === "html",
        },
        "HTML",
      ),
      h(
        "a",
        {
          onclick: () => actions.update({ preview: "tree" }),
          selected: state.preview === "tree",
        },
        "AST",
      ),
    ]),
    h("div", { class: "main-preview" }, preview),
  ]);
};

app({
  state: {
    input: ` hello world

| A | B | C |
| - | - | - |
| _emph_ | ~strike~ | *mark* |
| __underline__| ~~del~~ | **bold** |
| other | \`inline code\` | text |

<!--comment-->

\`\`\`
var a = 11;
function foo(x) {
    return x + 1;
}
\`\`\`

This is another paragraph.

* One
* Two
* Three

1. A
1. B
1. C

This could be math: $1+1$.`, // string
    preview: "html", // "html" | "tree"
    parsed: {
      html: "", // string
      htmlError: undefined, // any
      tree: [], // any[]
      treeError: undefined, // any
    },
  },
  events: {
    load: (_, actions) => actions.updatePreviews(),
  },
  view: (state, actions) =>
    h("main", undefined, [LeftSide(state, actions), RightSide(state, actions)]),
  actions: {
    update: (_, __, s) => s,
    updateInput: (_, actions, input) => {
      actions.update({ input, parsed: {} });
      actions.updatePreviews();
    },
    updatePreviews: (() =>
      debounce(250, (state, actions) => {
        const { input } = state;
        let tree, treeError, html, htmlError;
        try {
          tree = parse(input);
        } catch (e) {
          console.error(e);
          treeError = e;
        }
        try {
          if (tree) html = print(tree).join("");
        } catch (e) {
          console.error(e);
          htmlError = e;
        }
        actions.update({ parsed: { tree, treeError, html, htmlError } });
      }))(),
  },
});
