const path = require("path");
const clonedeep = require("lodash.clonedeep");

const minifiedConfiguration = {
  entry: path.resolve(__dirname, "./src/TypesenseInstantsearchAdapter"),
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "typesense-instantsearch-adapter.min.js",
    library: {
      name: "TypesenseInstantSearchAdapter",
      type: "umd",
      export: "default",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};

const unminifiedConfiguration = clonedeep(minifiedConfiguration);
unminifiedConfiguration.mode = "development";
unminifiedConfiguration.output.filename = "typesense-instantsearch-adapter.js";

module.exports = [minifiedConfiguration, unminifiedConfiguration];
