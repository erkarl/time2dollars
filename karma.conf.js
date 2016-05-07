var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'src/**/*-test.js'
    ],

    preprocessors: {
      'src/**/*-test.js': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    }
  });
};
