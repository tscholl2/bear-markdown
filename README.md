Yet another markdown parser.

# What

A markdown parser based on [simple-markdown](https://github.com/Khan/simple-markdown).

# Why

I wanted to learn how markdown parsers work and learn more about [simple-markdown](https://github.com/Khan/simple-markdown).

Spoiler: markdown is hard to get right so I didn't.

# Features

Like [simple-markdown](https://github.com/Khan/simple-markdown), this parser

* is easily extensible (i.e. it is easy to add rules to parse custom things like [math](/src/rules/inline-math))
* is reasonably [fast](#Speed)
* is fairly well documented code
* has some [tests](/test/tests.json)
* parses into a simple AST (abstract syntax tree)
which can be turned into [html](/src/printers/html), react, vue, hyperapp, etc.
* is [small](#Size) (2.8kb minified + gzip)
* no dependencies

Unlike [simple-markdown](https://github.com/Khan/simple-markdown), this parser

* does not handle all edge cases
* does not confrom to commonmark or any other standard
* is a little slower
* has a slightly different (possibly a little more consistent) AST format
* is written in typescript

# Speed

I found several other markdown parsers and, with the least amount of effort, tried use them
to parse a string of markdown into a string of html. The benchmark can be found [here](/benchmark/index.ts).

| Parser | speed in op/s (higher is better) |
| --- | --- |
| this repo | 1991 |
| [simple-markdown](https://github.com/Khan/simple-markdown) | 2066 |
| [marked](https://github.com/chjj/marked) | 3348 |
| [markdown](https://github.com/evilstreak/markdown-js) | 1762* |
| [showdown](https://github.com/showdownjs/showdown) | 774* |
| [micromarkdown](https://github.com/SimonWaldherr/micromarkdown.js) | 14509* |
| [commonmarkjs](https://github.com/commonmark/commonmark.js) | 4541* |

*I don't think I'm using these correctly, they do not seem to be parsing tables.

# Size

I wrote a file which exports the basic parse function in the benchmark
and used the same webpack config to bundle, minify, and gzip it.
Essentially I ran this
```
yarn run bundle && gzip -c bundle.min.js > bundle.min.js.gzip
ls -lah | grep bundle
```

| Parser | size in kb (lower is better) | minified | gziped | 
| --- | --- | --- | --- |
| thie repo | 31 | 9.5 | 2.9 |
| [simple-markdown](https://github.com/Khan/simple-markdown) | 51 | 14 | 4.1 |
| [marked](https://github.com/chjj/marked) | 32 | 17 | 5.4 |
| [markdown](https://github.com/evilstreak/markdown-js) | 76 | 25 | 9 |
| [showdown](https://github.com/showdownjs/showdown) | 92 | 38 | 11 |
| [micromarkdown](https://github.com/SimonWaldherr/micromarkdown.js) | 20 | 11 | 4.7 |
| [commonmarkjs](https://github.com/commonmark/commonmark.js) | 160 | 86 | 34 |
