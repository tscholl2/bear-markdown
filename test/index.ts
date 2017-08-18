declare const describe: (description: string, test: () => void) => void;
declare const it: (description: string, test: () => void) => void;
declare const require: (s: string) => any;
const assert = require("assert");
import { defaultParser } from "../src";

const J = JSON.stringify;

describe("default rules:", () => {
  require("./tests.json").forEach((t: any) => {
    it(`${t.description || ""}: parses ${J(t.input)}`, () =>
      assert.deepEqual(defaultParser(t.input), t.output));
  });
});
