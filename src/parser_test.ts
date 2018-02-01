import { test } from "tape";
import { defaultParser } from "./";

test("default rules:", t => {
  require("./parser_tests.json").forEach((c: any) =>
    t.deepEqual(defaultParser(c.input), c.output, c.description),
  );
  t.end();
});
