const FileHound = require("filehound");
const { join } = require("path");
const glob = process.argv.slice(2).pop() || "*";

require("ts-node").register({ compilerOptions: { module: "commonjs" } });

const files = FileHound.create()
  .paths(join(__dirname, "..", "src"))
  .match("*_bench*")
  .ext("ts")
  .match(glob)
  .find()
  .each(f => console.log(f))
  .each(f => require(f));
