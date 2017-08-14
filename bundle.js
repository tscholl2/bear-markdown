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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export __extends */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __assign; });
/* unused harmony export __rest */
/* unused harmony export __decorate */
/* unused harmony export __param */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = printHTML;
function printHTML(tree, state) {
    if (tree === void 0) { tree = []; }
    if (state === void 0) { state = {}; }
    return tree.map(function (n) {
        switch (n.type) {
            case "text":
                return document.createTextNode(n.content);
            case "table":
                var table = document.createElement("table");
                var head_1 = document.createElement("thead");
                n.head.forEach(function (d, i) {
                    var th = document.createElement("th");
                    th.align = n.align[i];
                    printHTML(d, state).forEach(function (c) { return th.appendChild(c); });
                    head_1.appendChild(th);
                });
                table.appendChild(head_1);
                var body_1 = document.createElement("tbody");
                n.rows.forEach(function (r) {
                    var row = document.createElement("tr");
                    printHTML(r, state).forEach(function (c) { return row.appendChild(c); });
                    body_1.appendChild(row);
                });
                table.appendChild(body_1);
                return table;
            case "paragraph":
                var p_1 = document.createElement("p");
                printHTML(n.children, state).forEach(function (c) { return p_1.appendChild(c); });
                return p_1;
            case "list":
                var l_1 = document.createElement(/^\d/.test(n.bullet) ? "ol" : "ul");
                n.items.forEach(function (item) {
                    var i = document.createElement("li");
                    printHTML(item, state).forEach(function (c) { return i.appendChild(c); });
                    l_1.appendChild(i);
                });
                return l_1;
            case "link":
                var a_1 = document.createElement("a");
                a_1.href = n.href;
                printHTML(n.children, state).forEach(function (c) { return a_1.appendChild(c); });
                return a_1;
            case "image":
                var i = document.createElement("img");
                i.alt = n.alt;
                i.src = n.src;
                i.title = n.title;
                return i;
            case "heading":
                var h_1 = document.createElement("h" + n.level);
                printHTML(n.children, state).forEach(function (c) { return h_1.appendChild(c); });
                return h_1;
            case "emphasis":
                var delimiters = {
                    __: "u",
                    _: "em",
                    "~~": "s",
                    "~": "em",
                    "**": "strong",
                    "*": "mark",
                };
                var e_1 = document.createElement(delimiters[n.delimiter]);
                printHTML(n.children, state).forEach(function (c) { return e_1.appendChild(c); });
                return e_1;
            case "comment":
                return document.createComment(n.content);
            case "codeBlock":
                var pr = document.createElement("pre");
                var c = document.createElement("code");
                c.appendChild(document.createTextNode(n.content));
                pr.appendChild(c);
                return pr;
            case "blockQuote":
                var bq_1 = document.createElement("blockquote");
                printHTML(n.children, state).forEach(function (c) { return bq_1.appendChild(c); });
                return bq_1;
            case "inlineCode":
                var cd = document.createElement("code");
                cd.appendChild(document.createTextNode(n.content));
                return cd;
            default:
                throw new Error("unimplemented node: " + n.type);
        }
    });
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultParser", function() { return defaultParser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__html_printer__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rules__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "printHTML", function() { return __WEBPACK_IMPORTED_MODULE_1__html_printer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "newParser", function() { return __WEBPACK_IMPORTED_MODULE_0__parser__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "defaultRules", function() { return __WEBPACK_IMPORTED_MODULE_2__rules__["a"]; });





var defaultParser = Object(__WEBPACK_IMPORTED_MODULE_0__parser__["a" /* newParser */])(__WEBPACK_IMPORTED_MODULE_2__rules__["a" /* defaultRules */]);
var p = Object(__WEBPACK_IMPORTED_MODULE_0__parser__["a" /* newParser */])(__WEBPACK_IMPORTED_MODULE_2__rules__["a" /* defaultRules */]);
var s = "# header\n\n![image](url)\n\nsome text\n\n1. a\n2. b\n3. c\n\nthis is a [link](url)\n\nthis is an ![image](url)";
console.log(Object(__WEBPACK_IMPORTED_MODULE_1__html_printer__["a" /* printHTML */])(p(s)));
/*
var require: any;
const m = require("./simple.js");
console.log(JSON.stringify(m.defaultParse(s), null, 2));

// import list from "./rules/list";
// console.log(list.match(s, { inline: false }, ""));

const t = p(s);
console.log(JSON.stringify(t, null, 2));
*/


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = newParser;
/**
 * A parser-creator.
 * @param Rules A map of rules to use.
 * @returns {function} A function which parses content.
 */
function newParser(Rules) {
    var rules = Rules.sort(function (a, b) { return (a.order === b.order ? 0 : a.order > b.order ? 1 : -1); });
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultRules; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__block_quote__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__code_block__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comment__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__emphasis__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__escape__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__heading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__image__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__inline_code__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__link__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__list__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__paragraph__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__table__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__text__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__newline__ = __webpack_require__(18);















var defaultRules = [
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_3__comment__["a" /* default */], { order: 0 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_14__newline__["a" /* default */], { order: 1 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_1__block_quote__["a" /* default */], { order: 2 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_6__heading__["a" /* default */], { order: 3 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_2__code_block__["a" /* default */], { order: 4 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_10__list__["a" /* default */], { order: 5 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_12__table__["a" /* default */], { order: 6 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_11__paragraph__["a" /* default */], { order: 7 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_8__inline_code__["a" /* default */], { order: 8 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_5__escape__["a" /* default */], { order: 9 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_4__emphasis__["a" /* default */], { order: 10 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_7__image__["a" /* default */], { order: 6 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_9__link__["a" /* default */], { order: 12 }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_13__text__["a" /* default */], { order: 13 }),
];


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^(" +
    // any amount of space and a >
    "\\s*>" +
    // match any non-newlines
    "[^\\n]*" +
    // find all lines like this
    ")+" +
    // until a newline
    "\\n");
/* harmony default export */ __webpack_exports__["a"] = ({
    order: 6,
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? undefined : re.exec(s));
    },
    parse: function (capture, parse, state) { return ({
        type: "blockQuote",
        // parse by replacing the initial ">" in front of lines
        children: parse(capture[0].replace(/^ *> ?/gm, ""), state),
    }); },
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^" +
    "```" +
    // match anything between ```'s greedy so stops at first ```
    "([\\s\\S]+)?" +
    "```");
/* harmony default export */ __webpack_exports__["a"] = ({
    order: 24,
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? null : re.exec(s));
    },
    parse: function (capture) { return ({
        type: "codeBlock",
        content: capture[1],
    }); },
});


/***/ }),
/* 7 */
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
    order: -1,
    match: function (s) { return re.exec(s); },
    parse: function (capture) { return ({
        type: "comment",
        content: capture[1],
    }); },
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^" +
    // delimters are __, **, ~~, _, *, or ~
    "(__|\\*\\*|~~|_|\\*|~)" +
    // match until the next matching delimiter
    "([^(?:\\1)]*)?" +
    "\\1");
/* harmony default export */ __webpack_exports__["a"] = ({
    order: 23,
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture, parse, state) { return ({
        type: "emphasis",
        delimiter: capture[1],
        children: parse(capture[2], state),
    }); },
});


/***/ }),
/* 9 */
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
    order: -1,
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture) { return ({
        type: "text",
        content: capture[1],
    }); },
});


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);

var re = new RegExp("^" +
    // look for between 1 and 6 #'s
    "(#{1,6})\\s*" +
    // then any characters
    "([^\\n]*)" +
    // until the end of the line, which may have some #'s also
    "(?:\\s*#*\\s*)?(?=\n|$)");
/* harmony default export */ __webpack_exports__["a"] = ({
    order: 0,
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? undefined : re.exec(s));
    },
    parse: function (capture, parse, state) {
        if (state === void 0) { state = {}; }
        return ({
            type: "heading",
            level: capture[1].length,
            children: parse(capture[2], __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, state, { inline: true })),
        });
    },
});


/***/ }),
/* 11 */
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
    '\\s*(?:"([^"])")?' +
    // end parens
    "\\)");
/* harmony default export */ __webpack_exports__["a"] = ({
    order: 17,
    match: function (s) { return re.exec(s); },
    parse: function (capture) { return ({
        type: "image",
        alt: capture[1] || "",
        src: capture[2] || "",
        title: capture[3] || "",
    }); },
});


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var re = new RegExp("^" +
    "`" +
    // match anything between `'s greedy so stops at first *
    "([\\s\\S]+)" +
    "`");
/* harmony default export */ __webpack_exports__["a"] = ({
    order: 24,
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture) { return ({
        type: "inlineCode",
        content: capture[2],
    }); },
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);

var re = new RegExp("^" +
    // look for stuff inside brackets [...]
    "\\[([^\\]]+)\\]" +
    // look for stuff inside parens (...)
    "\\(([^\\)]+)\\)");
/* harmony default export */ __webpack_exports__["a"] = ({
    order: -1,
    match: function (s, _a) {
        var inline = _a.inline;
        return (inline ? re.exec(s) : null);
    },
    parse: function (capture, parse, state) { return ({
        type: "link",
        href: capture[2],
        children: parse(capture[1], __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, state, { inline: true })),
    }); },
});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var listItemRE = new RegExp(
// a list item can start with an arbitrary indent
"^( *)" +
    // followed by a bullet
    "([\\*\\-\\+]|\\d+\\.)" +
    // followed by anything
    "([\\s\\S]*?)" +
    // until EOF, 2 newlines, or the same indent and a bullet
    "(?=$|\\n\\n|\\n\\1(?:[\\*\\-\\+]|\\d+\\.))");
/* harmony default export */ __webpack_exports__["a"] = ({
    order: 7,
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
            bullet: capture[1][2],
            items: capture.slice(1).map(function (item) {
                var content = item[3]
                    .replace(new RegExp("^" + item[1], "gm"), "");
                var containsBlock = content.includes("\n\n");
                content = content.trim() + (containsBlock ? "\n\n" : "");
                return parse(content, Object.assign({}, state, { inline: !containsBlock, _list: true }));
            }),
        };
    },
});


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);

// TODO: explain
var re = new RegExp("^" +
    // match everything
    "([\\s\\S]+?)" +
    // until the first double new line (i.e. blank line) or end
    "(?:\n\n|$)");
/* harmony default export */ __webpack_exports__["a"] = ({
    order: -1,
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
        children: parse(capture[1].trim(), __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, state, { inline: true })),
    }); },
});


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);

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
// "|" then a repeat("not a |" then a "|") followed by a newline or EOF
var tableRowRE = /^s*\|((?:[^\|\n]+\|)+)\s*(?=\n|$)/;
// an alignment row is
// "|" then a repeat(":---:" then a "|") followed by a newline
// where the ":" are optional and there can be many/few "-"'s
var tableAlignRE = /^\s*\|((?:\s*:?\-+:?\s*\|)+)\s*(?=\n)/;
/* harmony default export */ __webpack_exports__["a"] = ({
    order: 9,
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
    parse: function (capture, parse, state) { return ({
        type: "table",
        head: capture[1]
            .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
            .split(/\s*\|\s*/) // split on |'s
            .map(function (h) { return parse(h, Object.assign({}, state, { inline: true })); }),
        align: capture[2]
            .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
            .split(/\s*\|\s*/) // split on |'s
            .map(function (a) {
            var left = a.startsWith(":");
            var right = a.endsWith(":");
            return left === right ? "center" : left ? "left" : "right";
        }),
        rows: capture.slice(3).map(function (row) {
            return row
                .replace(/^\s*\|\s*|\s*\|\s*$/g, "") // remove beggenning and ending |'s
                .split(/\s*\|\s*/) // split on |'s
                .map(function (h) { return parse(h, __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, state, { inline: true })); });
        }),
    }); },
});


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    order: -1,
    match: function (s, _a) {
        var inline = _a.inline;
        // take at least one letter (that isn't a newline)
        // and keep going until we get to something that
        // might possibly match something else (image, emphasis, etc.)
        // or the end of the match
        return inline ? /^[^\n]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n|$)/.exec(s) : null;
    },
    parse: function (capture) { return ({
        type: "text",
        content: capture[0],
    }); },
});


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    order: -1,
    match: function (s) { return /^\n/.exec(s); },
    parse: function () { return undefined; },
});


/***/ })
/******/ ]);
});