import * as Benchmark from "benchmark";

new (Benchmark as any).Suite()
  .add("\\s\\S", () => {
    /<!--([\s\S]*?)-->/.exec("<!-- hi --> <!-- bye -->");
  })
  .add("[^>]*", () => {
    /<!--([^(?:\-\->)]*)-->/.exec("<!-- hi --> <!-- bye -->");
  })
  // add listeners
  .on("cycle", (event: any) => {
    console.log(String(event.target));
  })
  // run async
  .run({ async: false });
