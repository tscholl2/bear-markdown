const path = require("path");

module.exports = {
  entry: "./src/index.ts",

  output: {
    filename: "bundle.js",
    libraryTarget: "umd",
  },

  module: {
    rules: [{ test: /\.ts$/, use: "awesome-typescript-loader" }],
  },

  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],
    extensions: [".ts", ".js"],
  },

  devtool: false,
};
