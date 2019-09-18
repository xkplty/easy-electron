const baseConfig = require('./base.js');
const webpack = require('webpack');

const devPlugins = [
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'development'
    }),
];

const plugins = baseConfig.plugins.concat(devPlugins);

module.exports = {
    mode: 'development',
    watch: true,
    ...baseConfig,
    plugins
};