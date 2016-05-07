var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
new WebpackDevServer(webpack(config), config.devServer)
  .listen(process.env.PORT);
