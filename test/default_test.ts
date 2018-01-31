import { test } from "tape";
import { defaultParser } from "../src";

declare const require: any;

test("default rules:", t => {
  require("./tests.json").forEach((c: any) =>
    t.deepEqual(defaultParser(c.input), c.output, c.description),
  );
  t.end();
});
