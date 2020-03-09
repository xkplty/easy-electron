const baseConfig = require("./base.js");
const webpack = require("webpack");

const prodPlugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: "production"
  })
];

const plugins = baseConfig.plugins.concat(prodPlugins);

module.exports = {
  mode: "production",
  ...baseConfig,
  plugins
};
