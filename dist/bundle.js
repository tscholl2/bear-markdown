(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var START_TO_END_DELIMITER = {
    $: "$",
    $$: "$$",
    "\\[": "\\]",
    "\\(": "\\)",
};
function newMathMatcher(inlineMatcher) {
    return function (s, _a, previousCapture) {
        var _b = _a.inline, inline = _b === void 0 ? false : _b;
        if (previousCapture.endsWith("\\") || inline != inlineMatcher) {
            return;
        }
        var startRE = (inlineMatcher ? /^(\$|\\\()/ : /^(\$\$|\\\[)/).exec(s);
        if (startRE == null) {
            return;
        }
        var start = startRE[1];
        var end = START_TO_END_DELIMITER[start];
        s = s.substr(start.length);
        var match = "";
        var brace = 0;
        var escaped = false;
        while ((!s.startsWith(end) || brace !== 0 || escaped) && s !== "") {
            escaped = s.startsWith("\\");
            brace += s.startsWith("{") ? 1 : s.startsWith("}") ? -1 : 0;
            match += s[0];
            s = s.substr(1);
        }
        return s !== "" ? [start + match + end, start + end, match] : undefined;
    };
}
exports.newMathMatcher = newMathMatcher;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __webpack_require__(2);
exports.newParser = parser_1.newParser;
var printer_1 = __webpack_require__(3);
exports.newPrinter = printer_1.newPrinter;
var printers_1 = __webpack_require__(4);
var rules_1 = __webpack_require__(5);
exports.defaultRules = rules_1.defaultRules;
exports.defaultParser = parser_1.newParser(rules_1.defaultRules);
exports.defaultHTMLPrinter = printer_1.newPrinter(printers_1.html);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
                var capture = rules[i].match(source, state, previousCapture);
                if (capture) {
                    source = source.substring(capture[0].length);
                    var node = rules[i].parse(capture, parse, state);
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
exports.newParser = newParser;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function newPrinter(printers) {
    return function print(tree, state) {
        if (state === void 0) { state = {}; }
        var output = [];
        for (var i = 0; i < tree.length; i++) {
            var node = tree[i];
            if (!printers.hasOwnProperty(node.type)) {
                throw new Error("no printer for type: " + node.type);
            }
            output.push(printers[node.type](node, print, state));
        }
        return output;
    };
}
exports.newPrinter = newPrinter;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inc = function (s) {
    s.key = (s.key || 0) + 1;
    return s.key;
};
var delimiters = {
    __: "u",
    _: "em",
    "~~": "s",
    "~": "del",
    "**": "strong",
    "*": "mark",
};
function newHTMLPrinters(h) {
    return {
        text: function (n) { return n.props.content; },
        table: function (n, print, s) { return h("table", { key: inc(s) }, print(n.children, s)); },
        tablehead: function (n, print, s) { return h("thead", { key: inc(s) }, print(n.children, s)); },
        tableheadcolumn: function (n, print, s) {
            return h("th", Object.assign({}, n.props, { key: inc(s) }), print(n.children, s));
        },
        tablebody: function (n, print, s) { return h("tbody", { key: inc(s) }, print(n.children, s)); },
        tablerow: function (n, print, s) { return h("tr", { key: inc(s) }, print(n.children, s)); },
        tablecolumn: function (n, print, s) { return h("td", { key: inc(s) }, print(n.children, s)); },
        paragraph: function (n, print, s) { return h("p", { key: inc(s) }, print(n.children, s)); },
        list: function (n, print, s) {
            return h(/^\d/.test(n.props.bullet) ? "ol" : "ul", { key: inc(s) }, print(n.children, s));
        },
        listitem: function (n, print, s) { return h("li", { key: inc(s) }, print(n.children, s)); },
        link: function (n, print, s) {
            return h("a", Object.assign({}, n.props, { key: inc(s) }), print(n.children, s));
        },
        image: function (n, _, s) { return h("img", Object.assign({}, n.props, { key: inc(s) })); },
        heading: function (n, print, s) { return h("h" + n.props.level, { key: inc(s) }, print(n.children, s)); },
        emphasis: function (n, print, s) {
            return h(delimiters[n.props.delimiter], { key: inc(s) }, print(n.children, s));
        },
        comment: function (n) { return "<!--" + n.props.content + "-->"; },
        code: function (n, _, s) {
            return n.props.display === "inline"
                ? h("code", { key: inc(s) }, [n.props.content.trim()])
                : h("pre", { key: inc(s) }, [h("code", { key: inc(s) }, [n.props.content.trim()])]);
        },
        blockquote: function (n, print, s) { return h("blockquote", { key: inc(s) }, print(n.children, s)); },
        math: function (n, _, s) { return h("math", { key: inc(s) }, [n.props.content.trim()]); },
    };
}
exports.newHTMLPrinters = newHTMLPrinters;
exports.html = newHTMLPrinters(function (tag, attr, children) {
    if (attr === void 0) { attr = {}; }
    if (children === void 0) { children = []; }
    var a = "";
    for (var key in attr) {
        if (attr.hasOwnProperty(key) && key != "id") {
            a += " \"" + key + "\"=\"" + attr[key] + "\"";
        }
    }
    return "<" + tag + a + ">" + children.join("") + "</" + tag + ">";
});
exports.react = newHTMLPrinters(function (type, data, children) {
    if (data === void 0) { data = {}; }
    if (children === void 0) { children = []; }
    return ({
        type: type,
        key: data.key,
        props: Object.assign({ children: children }, data, { key: undefined }),
    });
});
exports.hyperapp = newHTMLPrinters(function (tag, data, children) {
    if (data === void 0) { data = {}; }
    if (children === void 0) { children = []; }
    return ({
        tag: tag,
        data: data,
        children: children,
    });
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var block_quote_1 = __webpack_require__(6);
var block_code_1 = __webpack_require__(7);
var comment_1 = __webpack_require__(8);
var emphasis_1 = __webpack_require__(9);
var escape_1 = __webpack_require__(10);
var heading_1 = __webpack_require__(11);
var image_1 = __webpack_require__(12);
var inline_code_1 = __webpack_require__(13);
var link_1 = __webpack_require__(14);
var list_1 = __webpack_require__(15);
var inline_math_1 = __webpack_require__(16);
var block_math_1 = __webpack_require__(17);
var paragraph_1 = __webpack_require__(18);
var table_1 = __webpack_require__(19);
var text_1 = __webpack_require__(20);
var newline_1 = __webpack_require__(21);
exports.defaultRules = [
    Object.assign({}, comment_1.default, { order: 0 }),
    // BLOCKS
    Object.assign({}, newline_1.default, { order: 1 }),
    Object.assign({}, block_quote_1.default, { order: 2 }),
    Object.assign({}, heading_1.default, { order: 3 }),
    Object.assign({}, block_math_1.default, { order: 4 }),
    Object.assign({}, block_code_1.default, { order: 5 }),
    Object.assign({}, list_1.default, { order: 6 }),
    Object.assign({}, table_1.default, { order: 7 }),
    Object.assign({}, paragraph_1.default, { order: 8 }),
    // INLINE
    Object.assign({}, inline_math_1.default, { order: 9 }),
    Object.assign({}, escape_1.default, { order: 10 }),
    Object.assign({}, inline_code_1.default, { order: 11 }),
    Object.assign({}, emphasis_1.default, { order: 12 }),
    Object.assign({}, image_1.default, { order: 13 }),
    Object.assign({}, link_1.default, { order: 14 }),
    Object.assign({}, text_1.default, { order: 15 }),
];


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^(" +
    // any amount of space and a >
    "\\s*>" +
    // match any non-newlines
    "[^\\n]*" +
    // find all lines like this
    ")+" +
    // repeat until a newline or end
    "(\\n|$)");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? undefined : re.exec(s));
    },
    parse: function (capture, parse, state) { return ({
        type: "blockquote",
        // parse by replacing the initial ">" in front of lines
        children: parse(capture[0].replace(/^\s*> ?/gm, ""), state),
    }); },
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    "```" +
    // match anything between ```'s greedy so stops at first ```
    // note: we include escaped delimiters e.g. "\```"
    "((?:[\\s\\S]|\\\\```)+)?" +
    "```");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? undefined : re.exec(s));
    },
    parse: function (capture) { return ({
        type: "code",
        // replace any escaped delimiters
        props: { display: "block", content: capture[1].replace(/\\```/g, "```") },
    }); },
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    // match everything between <!-- and -->
    "<!--" +
    // will match until non-closing
    "[^(?:\\-\\->)]" +
    // closing -->
    "-->");
exports.default = {
    match: function (s) { return re.exec(s); },
    parse: function (capture) { return ({ type: "comment", props: { content: capture[1] } }); },
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    // delimters are __, **, ~~, _, *, or ~
    "(__|\\*\\*|~~|_|\\*|~)" +
    // match until the next matching delimiter
    // note: we also include escaped delimiters e.g. \* or \~
    // note note: we don't need to replace these because
    // the match is parsed so they will be escaped properly
    "((?:\\\\\\1|[^(?:\\1)])*)?" +
    "\\1");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : undefined);
    },
    parse: function (capture, parse, state) { return ({
        type: "emphasis",
        props: { delimiter: capture[1] },
        children: parse(capture[2], state),
    }); },
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^\\\\([" +
    "\\" + // \   backslash
    "\\`" + // `   backtick
    "\\*" + // *   asterisk
    "\\_" + // _   underscore
    "\\{\\}" + // {}  curly braces
    "\\[\\]" + // []  square brackets
    "\\(\\)" + // ()  parentheses
    "\\#" + // #   hash mark
    "\\+" + // +   plus sign
    "\\-" + // -   minus sign (hyphen)
    "\\." + // .   dot
    "\\!" + // !   exclamation mark
    "\\<" + // <   less-than    <-- added in Spec Markdown
    "\\>" + // >   greater-than <-- added in Spec Markdown
    "\\|" + // |   pipe         <-- added in Spec Markdown
    "\\$" + // $   dollar sign  <-- added by me (b/c math)
    "\\~" + // ~   tilde        <-- added by me (b/c ~ is used in emphasis)
    "])");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : undefined);
    },
    parse: function (capture) { return ({ type: "text", props: { content: capture[1] } }); },
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    // look for between 1 and 6 #'s
    "(#{1,6})\\s*" +
    // then any characters
    "([^\\n]*)" +
    // until the end of the line, which may have some #'s also
    "(?:\\s*#*\\s*)?(?=\n|$)");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? undefined : re.exec(s));
    },
    parse: function (capture, parse, state) {
        if (state === void 0) { state = {}; }
        return ({
            type: "heading",
            props: { level: capture[1].length },
            children: parse(capture[2], Object.assign({}, state, { inline: true })),
        });
    },
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : undefined);
    },
    parse: function (capture) { return ({
        type: "image",
        props: {
            alt: (capture[1] || "").trim(),
            src: (capture[2] || "").trim(),
            title: (capture[3] || "").trim(),
        },
    }); },
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    "`" +
    // match anything between "`"s greedy so stops at first *
    // note: we include escaped "`"s as well so it doesn't end early
    "((?:[\\s\\S]|\\\\`)+)" +
    "`");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture) { return ({
        type: "code",
        props: {
            // we replace escaped "`"s to allow for using "`"s inside inline code
            display: "inline",
            content: capture[1].replace("\\`", "`"),
        },
    }); },
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp("^" +
    // look for stuff inside brackets [...]
    "\\[([^\\]]+)\\]" +
    // look for stuff inside parens (...)
    "\\(([^\\)]+)\\)");
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture, parse, state) { return ({
        type: "link",
        props: { href: capture[2] },
        children: parse(capture[1], Object.assign({}, state, { inline: true })),
    }); },
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
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
            type: "list",
            props: { bullet: capture[1][2] },
            children: capture.slice(1).map(function (item) {
                var content = item[3]
                    .replace(new RegExp("^" + item[1], "gm"), "");
                var containsBlock = content.includes("\n\n");
                content = content.trim() + (containsBlock ? "\n\n" : "");
                return {
                    type: "listitem",
                    children: parse(content, Object.assign({}, state, { inline: !containsBlock, _list: true })),
                };
            }),
        };
    },
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = __webpack_require__(0);
exports.default = {
    match: math_1.newMathMatcher(true),
    parse: function (capture) { return ({ type: "math", props: { display: "inline", content: capture[2] } }); },
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = __webpack_require__(0);
exports.default = {
    match: math_1.newMathMatcher(false),
    parse: function (capture) { return ({ type: "math", props: { display: "block", content: capture[2] } }); },
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// TODO: explain
var re = new RegExp("^" +
    // match everything
    "([\\s\\S]+?)" +
    // until the first double new line (i.e. blank line) or end
    "(?:\n\n|$)");
exports.default = {
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
        type: "paragraph",
        children: parse(capture[1].trim(), Object.assign({}, state, { inline: true })),
    }); },
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
var tableRowRE = /^\s*\|((?:[^\|\n]+\|)+)\s*(?=\n|$)/;
// an alignment row is
// "|" then a repeat(":---:" then a "|") followed by a newline
// where the ":" are optional and there can be many/few "-"'s
var tableAlignRE = /^\s*\|((?:\s*:?\-+:?\s*\|)+)\s*(?=\n)/;
exports.default = {
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
            type: "table",
            children: [
                {
                    type: "tablehead",
                    children: capture[1]
                        .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
                        .split(/\s*\|\s*/) // split on |'s
                        .map(function (c, i) { return ({
                        type: "tableheadcolumn",
                        props: { align: align[i] },
                        children: parse(c, Object.assign({}, state, { inline: true })),
                    }); }),
                },
                {
                    type: "tablebody",
                    children: capture.slice(3).map(function (r) { return ({
                        type: "tablerow",
                        children: r
                            .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
                            .split(/\s*\|\s*/) // split on |'s
                            .map(function (c) { return ({
                            type: "tablecolumn",
                            children: parse(c, Object.assign({}, state, { inline: true })),
                        }); }),
                    }); }),
                },
            ],
        };
    },
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// This is taken from the text rule from simple-markdown.
// It takes at least one letter (that isn't a newline)
// and keep going until we get to something that
// might possibly match something else (image, emphasis, etc.)
// or the end of the match.
// TODO: explain this regexp and what \u00c0-\uffff is
var re = /^[^\n]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n|$)/;
exports.default = {
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture) { return ({ type: "text", props: { content: capture[0] } }); },
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    match: function (s) { return /^\s*\n/.exec(s); },
    parse: function () { return undefined; },
};


/***/ })
/******/ ]);
});