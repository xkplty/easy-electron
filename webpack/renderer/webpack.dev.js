const webpack = require("webpack");
const { rendererConfig } = require("../webpack.base");
const { DEVELOPMENT } = require("../../src/constant/environment");

const devPlugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: DEVELOPMENT
  })
];

const plugins = rendererConfig.plugins.concat(devPlugins);

module.exports = {
  mode: DEVELOPMENT,
  watch: true,
  ...rendererConfig,
  plugins
};
