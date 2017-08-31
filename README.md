`bear-markdown`: Another markdown parser that "bear"-ly works.

[Try it online!](https://whatwhathuhhuh.gitlab.io/bear-markdown/)

![bear](logo.svg)

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

I wrote a file which exports the basic parse function in the benchmark
and used the same webpack config to bundle, minify, and gzip it.
Essentially I ran this
```
yarn run bundle && gzip -c bundle.min.js > bundle.min.js.gzip
ls -lah | grep bundle
```

| Parser | bundle size in kb (lower is better) | minified | gziped | 
| --- | --- | --- | --- |
| thie repo | 31 | 9.8 | 2.9 |
| [simple-markdown](https://github.com/Khan/simple-markdown) | 51 | 14 | 4.1 |
| [marked](https://github.com/chjj/marked) | 32 | 17 | 5.4 |
| [markdown](https://github.com/evilstreak/markdown-js) | 76 | 25 | 9 |
| [showdown](https://github.com/showdownjs/showdown) | 92 | 38 | 11 |
| [micromarkdown](https://github.com/SimonWaldherr/micromarkdown.js) | 20 | 11 | 4.7 |
| [commonmarkjs](https://github.com/commonmark/commonmark.js) | 160 | 86 | 34 |
