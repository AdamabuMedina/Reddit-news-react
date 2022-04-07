const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === "development"

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: path.resolve(__dirname, "src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  devServer: {
    open: true,
    hot: IS_DEV,
    port: 3000,
  },
  module: {
    rules: [{
      test: /\.[tj]sx?$/,
      use: ["ts-loader"]
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Reddit-news-react',
    filename: 'index.html',
    template: path.resolve(__dirname, "index.html")
  })]
}