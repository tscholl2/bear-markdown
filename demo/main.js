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

const parse = defaultParser;

function render(markdown) {
  // return fetch("https://tws.website:8001/chk", {
  return new Promise((resolve, reject) => {
    try {
      resolve(parse(markdown));
    } catch (e) {
      reject(e);
    }
  });
}

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

app({
  state: {
    value: "",
    preview: {
      value: "",
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
      Preview({
        value: state.preview.value,
        isLoading: state.preview.loading,
        error: state.preview.error,
      }),
    ),
  actions: {
    update: (state, actions, stuff) => Object.assign({}, state, stuff),
    requestPreview: (() =>
      debounce(1000, (state, actions) =>
        render(state.value)
          .then(tree =>
            actions.update({
              preview: Object.assign(state.preview, {
                value: tree,
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
