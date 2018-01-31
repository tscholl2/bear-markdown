const FileHound = require("filehound");
const { join } = require("path");
const glob = (process as any).argv.slice(2).pop() || "*";

const files = FileHound.create()
  .paths([join(__dirname, "..", "src"),join(__dirname, "..", "test")])
  .match("*_test*")
  .ext("ts")
  .match(glob)
  .find()
  .each((f: any) => console.log(f))
  .each((f: any) => require(f));
