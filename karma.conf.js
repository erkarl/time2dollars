var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      'src/*-test.js',
      'src/**/*-test.js'
    ],

    preprocessors: {
      'src/*-test.js': ['webpack'],
      'src/**/*-test.js': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    }
  });
};
