import { test } from "tape";
import { newParser, defaultRules } from "./";

test("custom rule", t => {
  const rules = defaultRules.concat([
    {
      match: source => /^@@@([^(?:@@@)].*)@@@/.exec(source),
      parse: (capture, _, { inline }) => ({
        type: "@@@",
        props: { content: capture[1], inline },
      }),
    },
  ]);
  const p = newParser(rules);
  const input = "some text $some math$ @@@{}@@@";
  const output = [
    {
      type: "paragraph",
      children: [
        { type: "text", props: { content: "some text " } },
        { type: "math", props: { display: "inline", content: "some math" } },
        { type: "text", props: { content: " " } },
        { type: "@@@", props: { content: "{}", inline: true } },
      ],
    },
  ];
  t.deepEqual(p(input), output, "finds @@@ block"), t.end();
});
