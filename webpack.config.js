var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'webpack-dev-server/client',
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'src/main')
    ]
  },
  output: {
    filename: '[name].js',
    pathInfo: true,
    path: path.join(__dirname, './build/'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/most-adapter/) // for adaperts not installed
  ],
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['src', 'node_modules']
  },
  devServer: {
    hot: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
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
