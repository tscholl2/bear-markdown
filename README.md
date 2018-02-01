`bear-markdown`: A very "bare" markdown parser.

[Try it online!](https://whatwhathuhhuh.gitlab.io/bear-markdown/)

![bear](logo.png)

# What

A markdown parser based on [simple-markdown](https://github.com/Khan/simple-markdown).

# Why

I wanted to learn how markdown parsers work and learn more
about [simple-markdown](https://github.com/Khan/simple-markdown).
Markdown is full of features that I don't use, so I wondered how compact
I could make a parser that suppported only what I needed.

Spoiler: markdown is hard to get right so I didn't.

# Features

Like [simple-markdown](https://github.com/Khan/simple-markdown), this parser

* is easily extensible (i.e. it is easy to add rules to parse custom things like [math](/src/rules/image.ts))
* is modular (i.e. it is easy to [add/modify/remove](/src/rules/index.ts) rules)
* is reasonably [fast](#Speed)
* is fairly well documented code
* has some [tests](/test/tests.json)
* parses raw markdown into a simple AST (abstract syntax tree)
which can be turned into [html](/src/printers/html), react, vue, hyperapp, etc.
* is [small](#Size) (2.9kb minified + gzip)
* no [dependencies](/package.json)

Unlike [simple-markdown](https://github.com/Khan/simple-markdown), this parser

* does not handle many edge cases
* does not confrom to commonmark or any other standard
* has a slightly different (possibly a little more consistent) AST format
* is written in typescript

# Speed

I found several other markdown parsers and, with the least amount of effort, tried use them
to parse a string of markdown into a string of html.
The benchmark can be found [here](/benchmark/index.ts).

| Parser | speed in op/s (higher is better) |
| --- | --- |
| this repo | 2107 |
| [simple-markdown](https://github.com/Khan/simple-markdown) | 1974 |
| [marked](https://github.com/chjj/marked) | 3140 |
| [markdown](https://github.com/evilstreak/markdown-js) | 1862* |
| [showdown](https://github.com/showdownjs/showdown) | 822* |
| [micromarkdown](https://github.com/SimonWaldherr/micromarkdown.js) | 8366* |
| [commonmarkjs](https://github.com/commonmark/commonmark.js) | 5677* |

*I had to edit the benchmark for these because they use a slightly different dialect of markdown.
The test isn't exactly apples-to-apples, but it's close.

# Size

| Parser | bundle size in kb (lower is better) | minified | gziped | 
| --- | --- | --- | --- |
| this repo | 31 | 11 | 3.0 |
| [simple-markdown](https://github.com/Khan/simple-markdown) | 51 | 13 | 4.2 |
| [marked](https://github.com/chjj/marked) | 34 | 17 | 5.6 |
| [markdown](https://github.com/evilstreak/markdown-js) | 76 | 26 | 9 |
| [showdown](https://github.com/showdownjs/showdown) | 173 | 98 | 33 |
| [micromarkdown](https://github.com/SimonWaldherr/micromarkdown.js) | 22 | 11 | 4.7 |
| [commonmarkjs](https://github.com/commonmark/commonmark.js) | 160 | 86 | 34 |

This table was made by manually editing `lib/index.js` so that it only requires one of the following libraries (e.g. `require("simple-markdown")`) and running
```
yarn run bundle && ls -lah dist/ | grep bundle
```
to measure the size of including each library.
