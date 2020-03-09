const webpack = require("webpack");
const { rendererConfig } = require("../webpack.base");
const { PRODUCTION } = require("../../src/constant/environment");

const prodPlugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: PRODUCTION
  })
];

const plugins = rendererConfig.plugins.concat(prodPlugins);

module.exports = {
  mode: PRODUCTION,
  ...rendererConfig,
  plugins
};
