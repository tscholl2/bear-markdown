declare const describe: (description: string, test: () => void) => void;
declare const it: (description: string, test: () => void) => void;
declare const require: (s: string) => any;

const assert = require("assert");
import link from "../src/rules2/link";

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
