declare const describe: (description: string, test: () => void) => void;
declare const it: (description: string, test: () => void) => void;
declare const require: (s: string) => any;

const assert = require("assert");
import link from "../src/rules2/link";
import list from "../src/rules2/list";

const J = JSON.stringify;

describe("link match", () => {
  const tests = [
    {
      input: `[label](url)`,
      state: { inline: true },
      output: ["[label](url)", "label", "url"],
    },
  ];
  tests.forEach(test =>
    it(`${J(test.input)} --> ${test.output}`, () =>
      assert.deepEqual(link.match(test.input, test.state, "")!.slice(0, 3), test.output)),
  );
});

describe("list match", () => {
  const tests = [
    {
      input: `* a\n* b`,
      state: { inline: false },
      output: ["* a\n* b", ["* a", "", "*", " a"], ["* b", "", "*", " b"]],
    },
    {
      input: `* a\n  1. b\n  2. c\n* d`,
      state: { inline: false },
      output: [
        "* a\n  1. b\n  2. c\n* d",
        ["* a\n  1. b\n  2. c", "", "*", " a\n  1. b\n  2. c"],
        ["* d", "", "*", " d"],
      ],
    },
    {
      input: `  1. b\n  2. c`,
      state: { inline: true, _list: true },
      output: ["  1. b\n  2. c", ["  1. b", "  ", "1.", " b"], ["  2. c", "  ", "2.", " c"]],
    },
  ];
  tests.forEach(test =>
    it(`${J(test.input)} --> ${test.output}`, () =>
      assert.deepEqual(JSON.parse(J(list.match(test.input, test.state, "\n"))), test.output)),
  );
});
