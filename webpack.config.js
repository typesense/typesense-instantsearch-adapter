const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/TypesenseInstantsearchAdapter"),
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "typesense-instantsearch-adapter.min.js",
    library: {
      name: "TypesenseInstantsearchAdapter",
      type: "umd",
      export: "default"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  }
};
