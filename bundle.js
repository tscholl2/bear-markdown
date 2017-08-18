(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultParser", function() { return defaultParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultHTMLPrinter", function() { return defaultHTMLPrinter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__printer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__printers__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rules__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "newParser", function() { return __WEBPACK_IMPORTED_MODULE_0__parser__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "defaultRules", function() { return __WEBPACK_IMPORTED_MODULE_3__rules__["a"]; });





// export { newPrinter };
var defaultParser = Object(__WEBPACK_IMPORTED_MODULE_0__parser__["a" /* newParser */])(__WEBPACK_IMPORTED_MODULE_3__rules__["a" /* defaultRules */]);
var defaultHTMLPrinter = Object(__WEBPACK_IMPORTED_MODULE_1__printer__["a" /* newPrinter */])(__WEBPACK_IMPORTED_MODULE_2__printers__["a" /* html */]);
/*
const s = `
# header

![alt](http://url)

This is a paragraph

* This
* is
* a
* list
`;

console.log(defaultHTMLPrinter(defaultParser(s)));
const p = newParser(defaultRules);
const s = "$$1+1$$";
console.log(JSON.stringify(p(s)));
var require: any;
const m = require("./simple.js");
console.log(JSON.stringify(m.defaultParse(s), null, 2));

// import list from "./rules/list";
// console.log(list.match(s, { inline: false }, ""));

const t = p(s);
console.log(JSON.stringify(t, null, 2));
*/


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = newParser;
/**
 * A parser-creator.
 * @param Rules A map of rules to use.
 * @returns {function} A function which parses content.
 */
function newParser(Rules) {
    var rules = Rules.sort(function (a, b) { return (a.order === b.order ? 0 : (a.order || 0) > (b.order || 0) ? 1 : -1); });
    // TODO: preparse source to remove any stupid stuff? (line endings?)
    var parse = function (source, state) {
        if (state === void 0) { state = {}; }
        var result = [];
        var previousCapture = "";
        while (source) {
            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                var capture = rule.match(source, state, previousCapture);
                if (capture) {
                    source = source.substring(capture[0].length);
                    var node = rule.parse(capture, parse, state);
                    if (Array.isArray(node)) {
                        result.push.apply(result, node);
                    }
                    else if (node != null) {
                        result.push(node);
                    }
                    previousCapture = capture[0];
                    break;
                }
                if (i === rules.length - 1) {
                    throw new Error("could not find rule to match content: " + JSON.stringify(source));
                }
            }
        }
        return result;
    };
    return parse;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = newPrinter;
function newPrinter(printers) {
    return function print(tree, state) {
        if (state === void 0) { state = {}; }
        return tree.map(function (node) {
            if (!printers.hasOwnProperty(node.tag)) {
                throw new Error("no printer for tag " + node.tag);
            }
            return printers[node.tag](node, print, state);
        });
    };
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__html__["a"]; });




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function h(tag, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var attr = Object.keys(props || {}).reduce(function (p, n) { return p + " \"" + n + "\"=\"" + props[n] + "\""; }, "");
    return "<" + tag + (attr ? " " + attr : "") + ">" + children.join("") + "</" + tag + ">";
}
/* harmony default export */ __webpack_exports__["a"] = ({
    text: function (n) { return n.props.content; },
    table: function (n, output) { return h.apply(void 0, ["table", undefined].concat(output(n.children))); },
    tablehead: function (n, output) { return h.apply(void 0, ["thead", undefined].concat(output(n.children))); },
    tableheadcolumn: function (n, output) { return h.apply(void 0, ["th", n.props].concat(output(n.children))); },
    tablebody: function (n, output) { return h.apply(void 0, ["tbody", undefined].concat(output(n.children))); },
    tablerow: function (n, output) { return h.apply(void 0, ["tr", undefined].concat(output(n.children))); },
    tablecolumn: function (n, output) { return h.apply(void 0, ["td", undefined].concat(output(n.children))); },
    paragraph: function (n, output) { return h.apply(void 0, ["p", undefined].concat(output(n.children))); },
    list: function (n, output) {
        return h.apply(void 0, [/^\d/.test(n.props.bullet) ? "ol" : "ul", undefined].concat(output(n.children)));
    },
    listitem: function (n, output) { return h.apply(void 0, ["li", undefined].concat(output(n.children))); },
    link: function (n, output) { return h.apply(void 0, ["a", n.props].concat(output(n.children))); },
    image: function (n) { return h("img", n.props); },
    heading: function (n, output) { return h.apply(void 0, ["h" + n.props.level, undefined].concat(output(n.children))); },
    emphasis: function (n, output) {
        var delimiters = { __: "u", _: "em", "~~": "s", "~": "em", "**": "strong", "*": "mark" };
        return h.apply(void 0, [delimiters[n.delimiter], undefined].concat(output(n.children)));
    },
    comment: function (n) { return "<!--" + n.props.content + "-->"; },
    code: function (n) {
        return n.props.display === "inline"
            ? h("code", undefined, n.props.content)
            : h("pre", undefined, h("code", undefined, n.props.content));
    },
    blockquote: function (n, output) { return h.apply(void 0, ["blockquote", undefined].concat(output(n.children))); },
    math: function (n) { return h("math", undefined, n.props.content); },
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultRules; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_quote__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block_code__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comment__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__emphasis__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__escape__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__heading__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__image__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__inline_code__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__link__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__list__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__paragraph__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__table__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__text__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__newline__ = __webpack_require__(19);










// import inlineMath from "./inline-math";
// import blockMath from "./block-math";




var defaultRules = [
    // ANY
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_2__comment__["a" /* default */], { order: 0 }),
    // BLOCKS
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_13__newline__["a" /* default */], { order: 1 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__block_quote__["a" /* default */], { order: 2 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_5__heading__["a" /* default */], { order: 3 }),
    //  Object.assign({}, blockMath, { order: 4 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_1__block_code__["a" /* default */], { order: 5 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_9__list__["a" /* default */], { order: 6 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_11__table__["a" /* default */], { order: 7 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_10__paragraph__["a" /* default */], { order: 8 }),
    // INLINE
    //  Object.assign({}, inlineMath, { order: 9 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_4__escape__["a" /* default */], { order: 10 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_7__inline_code__["a" /* default */], { order: 11 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_3__emphasis__["a" /* default */], { order: 12 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_6__image__["a" /* default */], { order: 13 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_8__link__["a" /* default */], { order: 14 }),
    Object.assign({}, __WEBPACK_IMPORTED_MODULE_12__text__["a" /* default */], { order: 15 }),
];


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^(" +
    // any amount of space and a >
    "\\s*>" +
    // match any non-newlines
    "[^\\n]*" +
    // find all lines like this
    ")+" +
    // repeat until a newline
    "\\n");
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? undefined : re.exec(s));
    },
    parse: function (capture, parse, state) { return ({
        tag: "blockquote",
        // parse by replacing the initial ">" in front of lines
        children: parse(capture[0].replace(/^ *> ?/gm, ""), state),
    }); },
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^" +
    "```" +
    // match anything between ```'s greedy so stops at first ```
    // note: we include escaped delimiters e.g. "\```"
    "((?:[\\s\\S]|\\\\```)+)?" +
    "```");
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? undefined : re.exec(s));
    },
    parse: function (capture) { return ({
        tag: "code",
        // replace any escaped delimiters
        props: { display: "block", content: capture[1].replace(/\\```/g, "```") },
    }); },
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^" +
    // match everything between <!-- and -->
    "<!--" +
    // will match until non-closing
    "[^(?:\\-\\->)]" +
    // closing -->
    "-->");
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s) { return re.exec(s); },
    parse: function (capture) { return ({ tag: "comment", props: { content: capture[1] } }); },
});


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^" +
    // delimters are __, **, ~~, _, *, or ~
    "(__|\\*\\*|~~|_|\\*|~)" +
    // match until the next matching delimiter
    // note: we also include escaped delimiters e.g. \* or \~
    // note note: we don't need to replace these because
    // the match is parsed so they will be escaped properly
    "((?:\\\\\\1|[^(?:\\1)])*)?" +
    "\\1");
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : undefined);
    },
    parse: function (capture, parse, state) { return ({
        tag: "emphasis",
        props: { delimiter: capture[1] },
        children: parse(capture[2], state),
    }); },
});


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^\\\\([" +
    "\\" +
    "\\`" +
    "\\*" +
    "\\_" +
    "\\{\\}" +
    "\\[\\]" +
    "\\(\\)" +
    "\\#" +
    "\\+" +
    "\\-" +
    "\\." +
    "\\!" +
    "\\<" +
    "\\>" +
    "\\|" +
    "\\$" +
    "\\~" +
    "])");
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : undefined);
    },
    parse: function (capture) { return ({ tag: "text", props: { content: capture[1] } }); },
});


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^" +
    // look for between 1 and 6 #'s
    "(#{1,6})\\s*" +
    // then any characters
    "([^\\n]*)" +
    // until the end of the line, which may have some #'s also
    "(?:\\s*#*\\s*)?(?=\n|$)");
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? undefined : re.exec(s));
    },
    parse: function (capture, parse, state) {
        if (state === void 0) { state = {}; }
        return ({
            tag: "heading",
            props: { level: capture[1].length },
            children: parse(capture[2], Object.assign({}, state, { inline: true })),
        });
    },
});


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^\\!" +
    // look for stuff inside brackets [...]
    "\\[([^\\]]+)?\\]" +
    // look for stuff inside parens (...)
    "\\(" +
    // look for url
    '([^\\)"]+)?' +
    // look for an optional title
    '\\s*(?:"([^"]+)")?' +
    // end parens
    "\\)");
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : undefined);
    },
    parse: function (capture) { return ({
        tag: "image",
        props: {
            alt: (capture[1] || "").trim(),
            src: (capture[2] || "").trim(),
            title: (capture[3] || "").trim(),
        },
    }); },
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^" +
    "`" +
    // match anything between "`"s greedy so stops at first *
    // note: we include escaped "`"s as well so it doesn't end early
    "((?:[\\s\\S]|\\\\`)+)" +
    "`");
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture) { return ({
        tag: "code",
        props: {
            // we replace escaped "`"s to allow for using "`"s inside inline code
            display: "inline",
            content: capture[1].replace("\\`", "`"),
        },
    }); },
});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^" +
    // look for stuff inside brackets [...]
    "\\[([^\\]]+)\\]" +
    // look for stuff inside parens (...)
    "\\(([^\\)]+)\\)");
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture, parse, state) { return ({
        tag: "link",
        props: { href: capture[2] },
        children: parse(capture[1], Object.assign({}, state, { inline: true })),
    }); },
});


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var listItemRE = new RegExp(
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
    "(?=$|\\n\\n|\\n\\1(?:[\\*\\-\\+]|\\d+\\.))");
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (source, _a, previousMatch) {
        var inline = _a.inline, _list = _a._list;
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
        var match = "";
        var bullet = "";
        var items = [];
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
            var capture = listItemRE.exec(source);
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
        return [match].concat(items);
    },
    parse: function (capture, parse, state) {
        return {
            tag: "list",
            props: { bullet: capture[1][2] },
            children: capture.slice(1).map(function (item) {
                var content = item[3]
                    .replace(new RegExp("^" + item[1], "gm"), "");
                var containsBlock = content.includes("\n\n");
                content = content.trim() + (containsBlock ? "\n\n" : "");
                return {
                    tag: "listitem",
                    children: parse(content, Object.assign({}, state, { inline: !containsBlock, _list: true })),
                };
            }),
        };
    },
});


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// TODO: explain
var re = new RegExp("^" +
    // match everything
    "([\\s\\S]+?)" +
    // until the first double new line (i.e. blank line) or end
    "(?:\n\n|$)");
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s, _a, previousMatch) {
        var inline = _a.inline;
        if (inline) {
            return;
        }
        // a paragraph must start on a new line
        if (!(previousMatch === "" || previousMatch.endsWith("\n"))) {
            return;
        }
        return re.exec(s);
    },
    parse: function (capture, parse, state) { return ({
        tag: "paragraph",
        children: parse(capture[1].trim(), Object.assign({}, state, { inline: true })),
    }); },
});


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
Example:

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

A table is a:

- table row
- table alignment
- table row
- table row
- ...
- table row
*/
// a row is
// "|" then repeat("not a |" then a "|") followed by a newline or EOF
var tableRowRE = /^s*\|((?:[^\|\n]+\|)+)\s*(?=\n|$)/;
// an alignment row is
// "|" then a repeat(":---:" then a "|") followed by a newline
// where the ":" are optional and there can be many/few "-"'s
var tableAlignRE = /^\s*\|((?:\s*:?\-+:?\s*\|)+)\s*(?=\n)/;
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (source, _a) {
        var inline = _a.inline;
        if (inline) {
            return;
        }
        var head = tableRowRE.exec(source);
        if (!head) {
            return;
        }
        var match = head[0] + "\n";
        source = source.substr(head[0].length + 1);
        var align = tableAlignRE.exec(source);
        if (!align) {
            return;
        }
        match += align[0] + "\n";
        source = source.substr(align[0].length + 1);
        var rows = [];
        while (tableRowRE.test(source)) {
            rows.push(tableRowRE.exec(source));
            match += rows[rows.length - 1][0] + "\n";
            source = source.substr(rows[rows.length - 1][0].length + 1);
        }
        if (rows.length === 0) {
            return;
        }
        return [match, head[0], align[0]].concat(rows.map(function (r) { return r[0]; }));
    },
    parse: function (capture, parse, state) {
        var align = capture[2]
            .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
            .split(/\s*\|\s*/) // split on |'s
            .map(function (a) {
            var left = a.startsWith(":");
            var right = a.endsWith(":");
            return left === right ? "center" : left ? "left" : "right";
        });
        return {
            tag: "table",
            children: [
                {
                    tag: "tablehead",
                    children: capture[1]
                        .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
                        .split(/\s*\|\s*/) // split on |'s
                        .map(function (c, i) { return ({
                        tag: "tableheadcolumn",
                        props: { align: align[i] },
                        children: parse(c, Object.assign({}, state, { inline: true })),
                    }); }),
                },
                {
                    tag: "tablebody",
                    children: capture.slice(3).map(function (r) { return ({
                        tag: "tablerow",
                        children: r
                            .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
                            .split(/\s*\|\s*/) // split on |'s
                            .map(function (c) { return ({
                            tag: "tablecolumn",
                            children: parse(c, Object.assign({}, state, { inline: true })),
                        }); }),
                    }); }),
                },
            ],
        };
    },
});


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s, _a) {
        var inline = _a.inline;
        // take at least one letter (that isn't a newline)
        // and keep going until we get to something that
        // might possibly match something else (image, emphasis, etc.)
        // or the end of the match
        return inline ? /^[^\n]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n|$)/.exec(s) : null;
    },
    parse: function (capture) { return ({ tag: "text", props: { content: capture[0] } }); },
});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    match: function (s) { return /^\n/.exec(s); },
    parse: function () { return undefined; },
});


/***/ })
/******/ ]);
});