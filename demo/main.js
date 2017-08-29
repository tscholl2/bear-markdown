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

const TreePreview = ({ tree }) => h("pre", { class: "tree" }, JSON.stringify(tree, null, 2));

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
  h(
    "div",
    { class: "left-side" },
    Toggle({
      value: state.preview === "html",
      ontoggle: () => actions.update({ preview: state.preview === "html" ? "tree" : "html" }),
      label: "HTML",
    }),
    Input({ value: state.input, update: actions.updateInput }),
  );

const RightSide = (state, actions) => {
  const children = [];
  if (state.preview === "html") {
    const { html, htmlError } = state.parsed;
    if (html != null) {
      children.push(HTMLPreview({ html }));
    } else if (htmlError != null) {
      children.push(Err({ error: htmlError }));
    } else {
      children.push(Loading());
    }
  } else {
    const { tree, treeError } = state.parsed;
    if (tree != null) {
      children.push(TreePreview({ tree }));
    } else if (treeError != null) {
      children.push(Err({ error: treeError }));
    } else {
      children.push(Loading());
    }
  }
  return h("div", { class: "right-side" }, children);
};

app({
  state: {
    input: "", // string
    preview: "html", // "html" | "tree"
    parsed: {
      html: "", // string
      htmlError: undefined, // any
      tree: [], // any[]
      treeError: undefined, // any
    },
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
          treeError = e;
        }
        try {
          if (tree) html = print(tree).join("");
        } catch (e) {
          htmlError = e;
        }
        actions.update({ parsed: { tree, treeError, html, htmlError } });
      }))(),
  },
});
