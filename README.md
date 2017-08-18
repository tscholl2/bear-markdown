Yet another markdown parser.

## What

A markdown parser based on [simple-markdown](https://github.com/Khan/simple-markdown).

## Why

I wanted to learn how markdown parsers work and learn more about [simple-markdown](https://github.com/Khan/simple-markdown).

Spoiler: markdown is hard to get right so I didn't.

## Features

Like [simple-markdown](https://github.com/Khan/simple-markdown), this parser

* is easily extensible (i.e. it is easy to add rules to parse custom things like [math](/src/rules/inline-math))
* is reasonably [fast](#Benchmarks)
* is fairly well documented code
* has some [tests](/test/tests.json)
* parses into a simple AST (abstract syntax tree)
which can be turned into [html](/src/printers/html), react, vue, hyperapp, etc.
* is [small](#Benchmarks) (2.9kb minified + gzip)

Unlike [simple-markdown](https://github.com/Khan/simple-markdown), this parser

* does not handle all edge cases
* does not confrom to commonmark or any other standard
* is a little slower
* has a slightly different (possibly a little more consistent) AST format
* is written in typescript

## Benchmarks

I found several other markdown parsers and, with the least amount of effort, tried use them
to parse a string of markdown into a string of html. The benchmark can be found [here](/benchmark/index.ts).

| Parser | speed in op/s (higher is better) |
| --- | --- |
| this repo | 2644 |
| [simple-markdown](https://github.com/Khan/simple-markdown) | 3045 |
| [marked](https://github.com/chjj/marked) | 4546 |
| [markdown](https://github.com/evilstreak/markdown-js) | 1866 |
| [showdown](https://github.com/showdownjs/showdown) | 791 |
| [micromarkdown](https://github.com/SimonWaldherr/micromarkdown.js) | 16490 |

I wrote a file which exports the basic parse function in the benchmark
and used the same webpack config to bundle, minify, and gzip it.
Essentially I ran this
```
yarn run bundle && gzip -c bundle.min.js > bundle.min.js.gzip
ls -lah | grep bundle
```

| Parser | size in kb (lower is better) | minified | gziped | 
| --- | --- | --- | --- |
| thie repo | 30 | 9.6 | 2.9 |
| [simple-markdown](https://github.com/Khan/simple-markdown) | 51 | 14 | 4.1 |
| [marked](https://github.com/chjj/marked) | 32 | 17 | 5.4 |
| [markdown](https://github.com/evilstreak/markdown-js) | 76 | 25 | 9 |
| [showdown](https://github.com/showdownjs/showdown) | 92 | 38 | 11 |
| [micromarkdown](https://github.com/SimonWaldherr/micromarkdown.js) | 20 | 11 | 4.7 |
