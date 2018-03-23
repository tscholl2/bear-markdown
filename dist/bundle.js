(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar parser_1 = __webpack_require__(/*! ./parser */ \"./lib/parser.js\");\nexports.newParser = parser_1.newParser;\nvar printer_1 = __webpack_require__(/*! ./printer */ \"./lib/printer.js\");\nexports.newPrinter = printer_1.newPrinter;\nvar rules_1 = __webpack_require__(/*! ./rules */ \"./lib/rules/index.js\");\nexports.defaultRules = rules_1.defaultRules;\nvar printers_1 = __webpack_require__(/*! ./printers */ \"./lib/printers/index.js\");\nexports.defaultParser = parser_1.newParser(rules_1.defaultRules);\nexports.defaultHTMLPrinter = printer_1.newPrinter(printers_1.html);\nvar printers_2 = __webpack_require__(/*! ./printers */ \"./lib/printers/index.js\");\nexports.newHTMLPrinters = printers_2.newHTMLPrinters;\n\n\n//# sourceURL=webpack:///./lib/index.js?");

/***/ }),

/***/ "./lib/parser.js":
/*!***********************!*\
  !*** ./lib/parser.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * A parser-creator.\n * @param Rules A map of rules to use.\n * @returns {function} A function which parses content.\n */\nfunction newParser(Rules) {\n    var rules = Rules.sort(function (a, b) { return (a.order === b.order ? 0 : (a.order || 0) > (b.order || 0) ? 1 : -1); });\n    // TODO: preparse source to remove any stupid stuff? (line endings?)\n    var parse = function (source, state) {\n        if (state === void 0) { state = {}; }\n        var result = [];\n        var previousCapture = \"\";\n        while (source) {\n            for (var i = 0; i < rules.length; i++) {\n                var capture = rules[i].match(source, state, previousCapture);\n                if (capture) {\n                    source = source.substring(capture[0].length);\n                    var node = rules[i].parse(capture, parse, state);\n                    if (Array.isArray(node)) {\n                        result.push.apply(result, node);\n                    }\n                    else if (node != null) {\n                        result.push(node);\n                    }\n                    previousCapture = capture[0];\n                    break;\n                }\n                if (i === rules.length - 1) {\n                    throw new Error(\"could not find rule to match content: \" + JSON.stringify(source));\n                }\n            }\n        }\n        return result;\n    };\n    return parse;\n}\nexports.newParser = newParser;\n\n\n//# sourceURL=webpack:///./lib/parser.js?");

/***/ }),

/***/ "./lib/printer.js":
/*!************************!*\
  !*** ./lib/printer.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction newPrinter(printers) {\n    return function print(tree, state) {\n        if (state === void 0) { state = {}; }\n        var output = [];\n        for (var i = 0; i < tree.length; i++) {\n            var node = tree[i];\n            if (!printers.hasOwnProperty(node.type)) {\n                throw new Error(\"no printer for type: \" + node.type);\n            }\n            output.push(printers[node.type](node, print, state));\n        }\n        return output;\n    };\n}\nexports.newPrinter = newPrinter;\n\n\n//# sourceURL=webpack:///./lib/printer.js?");

/***/ }),

/***/ "./lib/printers/index.js":
/*!*******************************!*\
  !*** ./lib/printers/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar inc = function (s) { return (s.key = (s.key || 0) + 1); };\nvar delimiters = {\n    __: \"u\",\n    _: \"em\",\n    \"~~\": \"s\",\n    \"~\": \"del\",\n    \"**\": \"strong\",\n    \"*\": \"mark\",\n};\nfunction newHTMLPrinters(h) {\n    return {\n        text: function (n) { return n.props.content; },\n        table: function (n, print, s) { return h(\"table\", { key: inc(s) }, print(n.children, s)); },\n        tablehead: function (n, print, s) { return h(\"thead\", { key: inc(s) }, print(n.children, s)); },\n        tableheadcolumn: function (n, print, s) {\n            return h(\"th\", Object.assign({}, n.props, { key: inc(s) }), print(n.children, s));\n        },\n        tablebody: function (n, print, s) { return h(\"tbody\", { key: inc(s) }, print(n.children, s)); },\n        tablerow: function (n, print, s) { return h(\"tr\", { key: inc(s) }, print(n.children, s)); },\n        tablecolumn: function (n, print, s) { return h(\"td\", { key: inc(s) }, print(n.children, s)); },\n        paragraph: function (n, print, s) { return h(\"p\", { key: inc(s) }, print(n.children, s)); },\n        list: function (n, print, s) {\n            return h(/^\\d/.test(n.props.bullet) ? \"ol\" : \"ul\", { key: inc(s) }, print(n.children, s));\n        },\n        listitem: function (n, print, s) { return h(\"li\", { key: inc(s) }, print(n.children, s)); },\n        link: function (n, print, s) {\n            return h(\"a\", Object.assign({}, n.props, { key: inc(s) }), print(n.children, s));\n        },\n        image: function (n, _, s) { return h(\"img\", Object.assign({}, n.props, { key: inc(s) })); },\n        heading: function (n, print, s) { return h(\"h\" + n.props.level, { key: inc(s) }, print(n.children, s)); },\n        emphasis: function (n, print, s) {\n            return h(delimiters[n.props.delimiter], { key: inc(s) }, print(n.children, s));\n        },\n        comment: function (n) { return \"<!--\" + n.props.content + \"-->\"; },\n        code: function (n, _, s) {\n            return n.props.display === \"inline\"\n                ? h(\"code\", { key: inc(s) }, [n.props.content.trim()])\n                : h(\"pre\", { key: inc(s) }, [h(\"code\", { key: inc(s) }, [n.props.content.trim()])]);\n        },\n        blockquote: function (n, print, s) { return h(\"blockquote\", { key: inc(s) }, print(n.children, s)); },\n        math: function (n, _, s) { return h(\"math\", { key: inc(s) }, [n.props.content.trim()]); },\n    };\n}\nexports.newHTMLPrinters = newHTMLPrinters;\nexports.html = newHTMLPrinters(function (tag, attr, children) {\n    if (attr === void 0) { attr = {}; }\n    if (children === void 0) { children = []; }\n    var a = \"\";\n    for (var key in attr) {\n        if (attr.hasOwnProperty(key) && key != \"id\") {\n            a += \" \\\"\" + key + \"\\\"=\\\"\" + attr[key] + \"\\\"\";\n        }\n    }\n    return \"<\" + tag + a + \">\" + children.join(\"\") + \"</\" + tag + \">\";\n});\n\n\n//# sourceURL=webpack:///./lib/printers/index.js?");

/***/ }),

/***/ "./lib/rules/block-code.js":
/*!*********************************!*\
  !*** ./lib/rules/block-code.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar re = new RegExp(\"^\" +\n    \"```\" +\n    // match anything between ```'s greedy so stops at first ```\n    // note: we include escaped delimiters e.g. \"\\```\"\n    \"((?:[\\\\s\\\\S]|\\\\\\\\```)+)?\" +\n    \"```\");\nexports.default = {\n    match: function (s, _a) {\n        var inline = _a.inline;\n        return (inline ? undefined : re.exec(s));\n    },\n    parse: function (capture) { return ({\n        type: \"code\",\n        // replace any escaped delimiters\n        props: { display: \"block\", content: capture[1].replace(/\\\\```/g, \"```\") },\n    }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/block-code.js?");

/***/ }),

/***/ "./lib/rules/block-math.js":
/*!*********************************!*\
  !*** ./lib/rules/block-math.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar math_1 = __webpack_require__(/*! ../utils/math */ \"./lib/utils/math.js\");\nexports.default = {\n    match: math_1.newMathMatcher(false),\n    parse: function (capture) { return ({ type: \"math\", props: { display: \"block\", content: capture[2] } }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/block-math.js?");

/***/ }),

/***/ "./lib/rules/block-quote.js":
/*!**********************************!*\
  !*** ./lib/rules/block-quote.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar re = new RegExp(\"^(\" +\n    // any amount of space and a >\n    \"\\\\s*>\" +\n    // match any non-newlines\n    \"[^\\\\n]*\" +\n    // find all lines like this\n    \")+\" +\n    // repeat until a newline or end\n    \"(\\\\n|$)\");\nexports.default = {\n    match: function (s, _a) {\n        var inline = _a.inline;\n        return (inline ? undefined : re.exec(s));\n    },\n    parse: function (capture, parse, state) { return ({\n        type: \"blockquote\",\n        // parse by replacing the initial \">\" in front of lines\n        children: parse(capture[0].replace(/^\\s*> ?/gm, \"\"), state),\n    }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/block-quote.js?");

/***/ }),

/***/ "./lib/rules/comment.js":
/*!******************************!*\
  !*** ./lib/rules/comment.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar re = new RegExp(\"^\" +\n    // match everything between <!-- and -->\n    \"<!--\" +\n    // will match until non-closing\n    \"[^(?:\\\\-\\\\->)]\" +\n    // closing -->\n    \"-->\");\nexports.default = {\n    match: function (s) { return re.exec(s); },\n    parse: function (capture) { return ({ type: \"comment\", props: { content: capture[1] } }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/comment.js?");

/***/ }),

/***/ "./lib/rules/emphasis.js":
/*!*******************************!*\
  !*** ./lib/rules/emphasis.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar re = new RegExp(\"^\" +\n    // delimters are __, **, ~~, _, *, or ~\n    \"(__|\\\\*\\\\*|~~|_|\\\\*|~)\" +\n    // match until the next matching delimiter\n    // note: we also include escaped delimiters e.g. \\* or \\~\n    // note note: we don't need to replace these because\n    // the match is parsed so they will be escaped properly\n    \"((?:\\\\\\\\\\\\1|[^(?:\\\\1)])*)?\" +\n    \"\\\\1\");\nexports.default = {\n    match: function (s, _a) {\n        var inline = _a.inline;\n        return (inline ? re.exec(s) : undefined);\n    },\n    parse: function (capture, parse, state) { return ({\n        type: \"emphasis\",\n        props: { delimiter: capture[1] },\n        children: parse(capture[2], state),\n    }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/emphasis.js?");

/***/ }),

/***/ "./lib/rules/escape.js":
/*!*****************************!*\
  !*** ./lib/rules/escape.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar re = new RegExp(\"^\\\\\\\\([\" +\n    \"\\\\\" + // \\   backslash\n    \"\\\\`\" + // `   backtick\n    \"\\\\*\" + // *   asterisk\n    \"\\\\_\" + // _   underscore\n    \"\\\\{\\\\}\" + // {}  curly braces\n    \"\\\\[\\\\]\" + // []  square brackets\n    \"\\\\(\\\\)\" + // ()  parentheses\n    \"\\\\#\" + // #   hash mark\n    \"\\\\+\" + // +   plus sign\n    \"\\\\-\" + // -   minus sign (hyphen)\n    \"\\\\.\" + // .   dot\n    \"\\\\!\" + // !   exclamation mark\n    \"\\\\<\" + // <   less-than    <-- added in Spec Markdown\n    \"\\\\>\" + // >   greater-than <-- added in Spec Markdown\n    \"\\\\|\" + // |   pipe         <-- added in Spec Markdown\n    \"\\\\$\" + // $   dollar sign  <-- added by me (b/c math)\n    \"\\\\~\" + // ~   tilde        <-- added by me (b/c ~ is used in emphasis)\n    \"])\");\nexports.default = {\n    match: function (s, _a) {\n        var inline = _a.inline;\n        return (inline ? re.exec(s) : undefined);\n    },\n    parse: function (capture) { return ({ type: \"text\", props: { content: capture[1] } }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/escape.js?");

/***/ }),

/***/ "./lib/rules/heading.js":
/*!******************************!*\
  !*** ./lib/rules/heading.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar re = new RegExp(\"^\" +\n    // look for between 1 and 6 #'s\n    \"(#{1,6})\\\\s*\" +\n    // then any characters\n    \"([^\\\\n]*)\" +\n    // until the end of the line, which may have some #'s also\n    \"(?:\\\\s*#*\\\\s*)?(?=\\n|$)\");\nexports.default = {\n    match: function (s, _a) {\n        var inline = _a.inline;\n        return (inline ? undefined : re.exec(s));\n    },\n    parse: function (capture, parse, state) {\n        if (state === void 0) { state = {}; }\n        return ({\n            type: \"heading\",\n            props: { level: capture[1].length },\n            children: parse(capture[2], Object.assign({}, state, { inline: true })),\n        });\n    },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/heading.js?");

/***/ }),

/***/ "./lib/rules/image.js":
/*!****************************!*\
  !*** ./lib/rules/image.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar re = new RegExp(\"^\\\\!\" +\n    // look for stuff inside brackets [...]\n    \"\\\\[([^\\\\]]+)?\\\\]\" +\n    // look for stuff inside parens (...)\n    \"\\\\(\" +\n    // look for url\n    '([^\\\\)\"]+)?' +\n    // look for an optional title\n    '\\\\s*(?:\"([^\"]+)\")?' +\n    // end parens\n    \"\\\\)\");\nexports.default = {\n    match: function (s, _a) {\n        var inline = _a.inline;\n        return (inline ? re.exec(s) : undefined);\n    },\n    parse: function (capture) { return ({\n        type: \"image\",\n        props: {\n            alt: (capture[1] || \"\").trim(),\n            src: (capture[2] || \"\").trim(),\n            title: (capture[3] || \"\").trim(),\n        },\n    }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/image.js?");

/***/ }),

/***/ "./lib/rules/index.js":
/*!****************************!*\
  !*** ./lib/rules/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar block_quote_1 = __webpack_require__(/*! ./block-quote */ \"./lib/rules/block-quote.js\");\nvar block_code_1 = __webpack_require__(/*! ./block-code */ \"./lib/rules/block-code.js\");\nvar comment_1 = __webpack_require__(/*! ./comment */ \"./lib/rules/comment.js\");\nvar emphasis_1 = __webpack_require__(/*! ./emphasis */ \"./lib/rules/emphasis.js\");\nvar escape_1 = __webpack_require__(/*! ./escape */ \"./lib/rules/escape.js\");\nvar heading_1 = __webpack_require__(/*! ./heading */ \"./lib/rules/heading.js\");\nvar image_1 = __webpack_require__(/*! ./image */ \"./lib/rules/image.js\");\nvar inline_code_1 = __webpack_require__(/*! ./inline-code */ \"./lib/rules/inline-code.js\");\nvar link_1 = __webpack_require__(/*! ./link */ \"./lib/rules/link.js\");\nvar list_1 = __webpack_require__(/*! ./list */ \"./lib/rules/list.js\");\nvar inline_math_1 = __webpack_require__(/*! ./inline-math */ \"./lib/rules/inline-math.js\");\nvar block_math_1 = __webpack_require__(/*! ./block-math */ \"./lib/rules/block-math.js\");\nvar paragraph_1 = __webpack_require__(/*! ./paragraph */ \"./lib/rules/paragraph.js\");\nvar table_1 = __webpack_require__(/*! ./table */ \"./lib/rules/table.js\");\nvar text_1 = __webpack_require__(/*! ./text */ \"./lib/rules/text.js\");\nvar newline_1 = __webpack_require__(/*! ./newline */ \"./lib/rules/newline.js\");\nexports.defaultRules = [\n    Object.assign({}, comment_1.default, { order: 0 }),\n    // BLOCKS\n    Object.assign({}, newline_1.default, { order: 1 }),\n    Object.assign({}, block_quote_1.default, { order: 2 }),\n    Object.assign({}, heading_1.default, { order: 3 }),\n    Object.assign({}, block_math_1.default, { order: 4 }),\n    Object.assign({}, block_code_1.default, { order: 5 }),\n    Object.assign({}, list_1.default, { order: 6 }),\n    Object.assign({}, table_1.default, { order: 7 }),\n    Object.assign({}, paragraph_1.default, { order: 8 }),\n    // INLINE\n    Object.assign({}, inline_math_1.default, { order: 9 }),\n    Object.assign({}, escape_1.default, { order: 10 }),\n    Object.assign({}, inline_code_1.default, { order: 11 }),\n    Object.assign({}, emphasis_1.default, { order: 12 }),\n    Object.assign({}, image_1.default, { order: 13 }),\n    Object.assign({}, link_1.default, { order: 14 }),\n    Object.assign({}, text_1.default, { order: 15 }),\n];\n\n\n//# sourceURL=webpack:///./lib/rules/index.js?");

/***/ }),

/***/ "./lib/rules/inline-code.js":
/*!**********************************!*\
  !*** ./lib/rules/inline-code.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar re = new RegExp(\"^\" +\n    \"`\" +\n    // match anything between \"`\"s greedy so stops at first *\n    // note: we include escaped \"`\"s as well so it doesn't end early\n    \"((?:[\\\\s\\\\S]|\\\\\\\\`)+)\" +\n    \"`\");\nexports.default = {\n    match: function (s, _a) {\n        var inline = _a.inline;\n        return (inline ? re.exec(s) : null);\n    },\n    parse: function (capture) { return ({\n        type: \"code\",\n        props: {\n            // we replace escaped \"`\"s to allow for using \"`\"s inside inline code\n            display: \"inline\",\n            content: capture[1].replace(\"\\\\`\", \"`\"),\n        },\n    }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/inline-code.js?");

/***/ }),

/***/ "./lib/rules/inline-math.js":
/*!**********************************!*\
  !*** ./lib/rules/inline-math.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar math_1 = __webpack_require__(/*! ../utils/math */ \"./lib/utils/math.js\");\nexports.default = {\n    match: math_1.newMathMatcher(true),\n    parse: function (capture) { return ({ type: \"math\", props: { display: \"inline\", content: capture[2] } }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/inline-math.js?");

/***/ }),

/***/ "./lib/rules/link.js":
/*!***************************!*\
  !*** ./lib/rules/link.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar re = new RegExp(\"^\" +\n    // look for stuff inside brackets [...]\n    \"\\\\[([^\\\\]]+)\\\\]\" +\n    // look for stuff inside parens (...)\n    \"\\\\(([^\\\\)]+)\\\\)\");\nexports.default = {\n    match: function (s, _a) {\n        var inline = _a.inline;\n        return (inline ? re.exec(s) : null);\n    },\n    parse: function (capture, parse, state) { return ({\n        type: \"link\",\n        props: { href: capture[2] },\n        children: parse(capture[1], Object.assign({}, state, { inline: true })),\n    }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/link.js?");

/***/ }),

/***/ "./lib/rules/list.js":
/*!***************************!*\
  !*** ./lib/rules/list.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar listItemRE = new RegExp(\n// a list item can start with an arbitrary indent\n\"^( *)\" +\n    // followed by a bullet\n    \"([\\\\*\\\\-\\\\+]|\\\\d+\\\\.)\" +\n    // followed by a space\n    \"\\\\s\" +\n    // followed by anything\n    \"([\\\\s\\\\S]*?)\" +\n    // until EOF, 2 newlines, or the same indent and a bullet\n    // note: different bullet means different list\n    \"(?=$|\\\\n\\\\n|\\\\n\\\\1(?:[\\\\*\\\\-\\\\+]|\\\\d+\\\\.))\");\nexports.default = {\n    match: function (source, _a, previousMatch) {\n        var inline = _a.inline, _list = _a._list;\n        // all list items must begin on a new line\n        if (previousMatch && !previousMatch.endsWith(\"\\n\")) {\n            return;\n        }\n        // if we are inside a list and previous match is empty, then we are not on a newline\n        // so we return. That is: \"1. * a\" is not a list in a list\n        if (_list && previousMatch === \"\") {\n            return;\n        }\n        // a list must be either a new block or inline inside a list (e.g. a sublist)\n        if (inline && !_list) {\n            return;\n        }\n        var match = \"\";\n        var bullet = \"\";\n        var items = [];\n        // while there is another list item\n        while (listItemRE.test(source)) {\n            // capture is of the form:\n            // [\n            //   full match,\n            //   indent,\n            //   bullet,\n            //   item content,\n            // TODO: add in pre-item stuff to know if was preceded by \\n\\n, or just \\n\n            // ]\n            var capture = listItemRE.exec(source);\n            if (capture && bullet !== \"\" && capture[2] !== bullet) {\n                break;\n            }\n            if (bullet === \"\") {\n                bullet = capture[2];\n            }\n            match += capture[0];\n            source = source.substr(capture[0].length);\n            // if we saw 2 newlines and there is another list item (with the same indent),\n            // then skip over the newlines\n            if (source.startsWith(\"\\n\\n\") && listItemRE.test(source.substr(2))) {\n                match += \"\\n\\n\";\n                source = source.substr(2);\n            }\n            // same for 1 newline\n            if (source.startsWith(\"\\n\") && listItemRE.test(source.substr(1))) {\n                match += \"\\n\";\n                source = source.substr(1);\n            }\n            items.push(capture);\n        }\n        if (items.length === 0) {\n            return;\n        }\n        return [match].concat(items);\n    },\n    parse: function (capture, parse, state) {\n        return {\n            type: \"list\",\n            props: { bullet: capture[1][2] },\n            children: capture.slice(1).map(function (item) {\n                var content = item[3]\n                    .replace(new RegExp(\"^\" + item[1], \"gm\"), \"\");\n                var containsBlock = content.includes(\"\\n\\n\");\n                content = content.trim() + (containsBlock ? \"\\n\\n\" : \"\");\n                return {\n                    type: \"listitem\",\n                    children: parse(content, Object.assign({}, state, { inline: !containsBlock, _list: true })),\n                };\n            }),\n        };\n    },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/list.js?");

/***/ }),

/***/ "./lib/rules/newline.js":
/*!******************************!*\
  !*** ./lib/rules/newline.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = {\n    match: function (s) { return /^\\s*\\n/.exec(s); },\n    parse: function () { return undefined; },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/newline.js?");

/***/ }),

/***/ "./lib/rules/paragraph.js":
/*!********************************!*\
  !*** ./lib/rules/paragraph.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// TODO: explain\nvar re = new RegExp(\"^\" +\n    // match everything\n    \"([\\\\s\\\\S]+?)\" +\n    // until the first double new line (i.e. blank line) or end\n    \"(?:\\n\\n|$)\");\nexports.default = {\n    match: function (s, _a, previousMatch) {\n        var inline = _a.inline;\n        if (inline) {\n            return;\n        }\n        // a paragraph must start on a new line\n        if (!(previousMatch === \"\" || previousMatch.endsWith(\"\\n\"))) {\n            return;\n        }\n        return re.exec(s);\n    },\n    parse: function (capture, parse, state) { return ({\n        type: \"paragraph\",\n        children: parse(capture[1].trim(), Object.assign({}, state, { inline: true })),\n    }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/paragraph.js?");

/***/ }),

/***/ "./lib/rules/table.js":
/*!****************************!*\
  !*** ./lib/rules/table.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/*\nExample:\n\n| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 2 is      | centered      |   $12 |\n| zebra stripes | are neat      |    $1 |\n\nA table is a:\n\n- table row\n- table alignment\n- table row\n- table row\n- ...\n- table row\n*/\n// a row is\n// \"|\" then repeat(\"not a |\" then a \"|\") followed by a newline or EOF\nvar tableRowRE = /^\\s*\\|((?:[^\\|\\n]+\\|)+)\\s*(?=\\n|$)/;\n// an alignment row is\n// \"|\" then a repeat(\":---:\" then a \"|\") followed by a newline\n// where the \":\" are optional and there can be many/few \"-\"'s\nvar tableAlignRE = /^\\s*\\|((?:\\s*:?\\-+:?\\s*\\|)+)\\s*(?=\\n)/;\nexports.default = {\n    match: function (source, _a) {\n        var inline = _a.inline;\n        if (inline) {\n            return;\n        }\n        var head = tableRowRE.exec(source);\n        if (!head) {\n            return;\n        }\n        var match = head[0] + \"\\n\";\n        source = source.substr(head[0].length + 1);\n        var align = tableAlignRE.exec(source);\n        if (!align) {\n            return;\n        }\n        match += align[0] + \"\\n\";\n        source = source.substr(align[0].length + 1);\n        var rows = [];\n        while (tableRowRE.test(source)) {\n            rows.push(tableRowRE.exec(source));\n            match += rows[rows.length - 1][0] + \"\\n\";\n            source = source.substr(rows[rows.length - 1][0].length + 1);\n        }\n        if (rows.length === 0) {\n            return;\n        }\n        return [match, head[0], align[0]].concat(rows.map(function (r) { return r[0]; }));\n    },\n    parse: function (capture, parse, state) {\n        var align = capture[2]\n            .replace(/^\\s*\\|\\s*|\\s*\\|\\s*$/g, \"\") // remove beggenning and ending |'s\n            .split(/\\s*\\|\\s*/) // split on |'s\n            .map(function (a) {\n            var left = a.startsWith(\":\");\n            var right = a.endsWith(\":\");\n            return left === right ? \"center\" : left ? \"left\" : \"right\";\n        });\n        return {\n            type: \"table\",\n            children: [\n                {\n                    type: \"tablehead\",\n                    children: capture[1]\n                        .replace(/^\\s*\\|\\s*|\\s*\\|\\s*$/g, \"\") // remove beggenning and ending |'s\n                        .split(/\\s*\\|\\s*/) // split on |'s\n                        .map(function (c, i) { return ({\n                        type: \"tableheadcolumn\",\n                        props: { align: align[i] },\n                        children: parse(c, Object.assign({}, state, { inline: true })),\n                    }); }),\n                },\n                {\n                    type: \"tablebody\",\n                    children: capture.slice(3).map(function (r) { return ({\n                        type: \"tablerow\",\n                        children: r\n                            .replace(/^\\s*\\|\\s*|\\s*\\|\\s*$/g, \"\") // remove beggenning and ending |'s\n                            .split(/\\s*\\|\\s*/) // split on |'s\n                            .map(function (c) { return ({\n                            type: \"tablecolumn\",\n                            children: parse(c, Object.assign({}, state, { inline: true })),\n                        }); }),\n                    }); }),\n                },\n            ],\n        };\n    },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/table.js?");

/***/ }),

/***/ "./lib/rules/text.js":
/*!***************************!*\
  !*** ./lib/rules/text.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// This is taken from the text rule from simple-markdown.\n// It takes at least one letter (that isn't a newline)\n// and keep going until we get to something that\n// might possibly match something else (image, emphasis, etc.)\n// or the end of the match.\n// TODO: explain this regexp and what \\u00c0-\\uffff is\nvar re = /^[^\\n]+?(?=[^0-9A-Za-z\\s\\u00c0-\\uffff]|\\n|$)/;\nexports.default = {\n    match: function (s, _a) {\n        var inline = _a.inline;\n        return (inline ? re.exec(s) : null);\n    },\n    parse: function (capture) { return ({ type: \"text\", props: { content: capture[0] } }); },\n};\n\n\n//# sourceURL=webpack:///./lib/rules/text.js?");

/***/ }),

/***/ "./lib/utils/math.js":
/*!***************************!*\
  !*** ./lib/utils/math.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar START_TO_END_DELIMITER = {\n    $: \"$\",\n    $$: \"$$\",\n    \"\\\\[\": \"\\\\]\",\n    \"\\\\(\": \"\\\\)\",\n};\nfunction newMathMatcher(inlineMatcher) {\n    return function (s, state, previousCapture) {\n        var inline = state.inline || false;\n        if (previousCapture.endsWith(\"\\\\\") || inline != inlineMatcher) {\n            return;\n        }\n        var startRE = (inlineMatcher ? /^(\\$|\\\\\\()/ : /^(\\$\\$|\\\\\\[)/).exec(s);\n        if (startRE == null) {\n            return;\n        }\n        var start = startRE[1];\n        var end = START_TO_END_DELIMITER[start];\n        s = s.substr(start.length);\n        var match = \"\";\n        var brace = 0;\n        var escaped = false;\n        while ((!s.startsWith(end) || brace !== 0 || escaped) && s !== \"\") {\n            escaped = s.startsWith(\"\\\\\");\n            brace += s.startsWith(\"{\") ? 1 : s.startsWith(\"}\") ? -1 : 0;\n            match += s[0];\n            s = s.substr(1);\n        }\n        return s !== \"\" ? [start + match + end, start + end, match] : undefined;\n    };\n}\nexports.newMathMatcher = newMathMatcher;\n\n\n//# sourceURL=webpack:///./lib/utils/math.js?");

/***/ })

/******/ });
});