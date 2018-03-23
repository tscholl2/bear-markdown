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

|                               Parser                               | speed in op/s (higher is better) |
| :----------------------------------------------------------------: | :------------------------------: |
|                             this repo                              |               2454               |
|     [simple-markdown](https://github.com/Khan/simple-markdown)     |               2045               |
|              [marked](https://github.com/chjj/marked)              |               2963               |
|       [markdown](https://github.com/evilstreak/markdown-js)        |              1912\*              |
|         [showdown](https://github.com/showdownjs/showdown)         |              814\*               |
| [micromarkdown](https://github.com/SimonWaldherr/micromarkdown.js) |              8525\*              |
|    [commonmarkjs](https://github.com/commonmark/commonmark.js)     |              5665\*              |

\*I had to edit the benchmark for these because they use a slightly different dialect of markdown.
The test isn't exactly apples-to-apples, but it's close.

# Size

|                               Parser                               | bundle size in kb (lower is better) | minified | gziped |
| :----------------------------------------------------------------: | :---------------------------------: | :------: | :----: |
|                             this repo                              |                 35                  |    11    |  2.9   |
|     [simple-markdown](https://github.com/Khan/simple-markdown)     |                 54                  |    13    |  4.3   |
|              [marked](https://github.com/chjj/marked)              |                 38                  |    19    |  6.1   |
|       [markdown](https://github.com/evilstreak/markdown-js)        |                 82                  |    25    |  8.9   |
|         [showdown](https://github.com/showdownjs/showdown)         |                 181                 |    98    |   33   |
| [micromarkdown](https://github.com/SimonWaldherr/micromarkdown.js) |                 22                  |    11    |  4.7   |
|    [commonmarkjs](https://github.com/commonmark/commonmark.js)     |                 203                 |    86    |   34   |

This table was made by manually editing `lib/index.js` so that it only requires one of the following libraries (e.g. `require("simple-markdown")`) and running

```
yarn run bundle && ls -lah dist/ | grep bundle
```

to measure the size of including each library.
