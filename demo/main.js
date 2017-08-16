// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(wait, func, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// parser
const parse = defaultParser;

function render(markdown) {
  // its done this way because i copied it from
  // something that did an async network call
  // and im too lazy to un-promisfy it
  return new Promise((resolve, reject) => {
    try {
      resolve(parse(markdown));
    } catch (e) {
      reject(e);
    }
  });
}

// view stuff
const { h, app } = hyperapp;

const Input = ({ value, update }) =>
  h("textarea", {
    style: {
      minWidth: "400px",
      minHeight: "300px",
    },
    oninput: ({ target: { value } }) => update(value),
    value,
    placeholder: "input",
  });

const Preview = ({ value, isLoading, error }) =>
  h(
    "div",
    undefined,
    isLoading
      ? h("progress", undefined)
      : h(
          "pre",
          { style: { display: "inline-block", border: `2px solid ${error ? "red" : "green"}` } },
          error ? `${error}` : JSON.stringify(value, null, 2),
        ),
  );

const HTMLPreview = ({ value, isLoading, error }) =>
  h(
    "div",
    undefined,
    isLoading || error
      ? h("progress", undefined)
      : h("pre", {
          style: { display: "inline-block", border: `2px solid green` },
          innerHTML: !value ? "" : new XMLSerializer().serializeToString(value),
        }),
  );

app({
  state: {
    value: "",
    preview: {
      value: [],
      html: undefined,
      error: undefined,
      loading: false,
    },
  },
  view: (state, actions) =>
    h(
      "div",
      undefined,
      Input({
        value: state.value,
        update: value => {
          setTimeout(actions.requestPreview, 100);
          actions.update({ value, preview: Object.assign(state.preview, { loading: true }) });
        },
      }),
      h("br"),
      HTMLPreview({
        value: state.preview.html,
        isLoading: state.preview.loading,
        error: state.preview.error,
      }),
      Preview({
        value: state.preview.value,
        isLoading: state.preview.loading,
        error: state.preview.error,
      }),
    ),
  actions: {
    update: (state, actions, stuff) => Object.assign({}, state, stuff),
    requestPreview: (() =>
      debounce(250, (state, actions) =>
        render(state.value)
          .then(
            tree =>
              console.log(defaultHTMLPrinter(tree)) ||
              actions.update({
                preview: Object.assign(state.preview, {
                  value: tree,
                  html: (() => {
                    const body = document.createElement("div");
                    const arr = defaultHTMLPrinter(tree);
                    arr.forEach(a => body.appendChild(a));
                    return body;
                  })(),
                  error: undefined,
                  loading: false,
                }),
              }),
          )
          .catch(
            error =>
              console.log(error) ||
              actions.update({
                preview: Object.assign(state.preview, {
                  value: null,
                  error,
                  loading: false,
                }),
              }),
          ),
      ))(),
  },
});
