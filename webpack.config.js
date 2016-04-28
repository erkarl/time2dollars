var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Time to Dollars',
      template: 'src/index.ejs',
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ]
  }
};
