const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const { DEVELOPMENT } = require("../../src/constant/environment");

module.exports = (environment) => {
  if (environment === DEVELOPMENT) {
    return devConfig;
  }
  return prodConfig
}

