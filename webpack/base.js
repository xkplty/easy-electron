const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const {
  entryPages,
  rendererDir,
  rendererDistDir,
  templateDir
} = require("./util.js");

const htmlPlugins = Object.keys(entryPages).map(
  v =>
    new HtmlWebpackPlugin({
      template: path.resolve(templateDir, "./index.html"),
      filename: `${v}/index.html`,
      chunks: [v]
    })
);

const baseModule = {
  rules: [
    {
      test: /\.js$/,
      use: "babel-loader",
      exclude: /node_modules/
    },
    {
      test: /\.(le|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]__[local]___[hash:base64:5]"
            },
            sourceMap: true
          }
        },
        "less-loader"
      ],
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "../../[folder]/[name].[ext]",
            emitFile: false
          }
        }
      ],
      exclude: /node_modules/
    },
    {
      test: /\.svg$/,
      use: ["@svgr/webpack"],
      exclude: /node_modules/
    }
  ]
};

const config = {
  entry: entryPages,
  output: {
    path: rendererDistDir,
    filename: "[name]/index.js"
  },
  module: baseModule,
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
    __filename: true,
    __dirname: true
  },
  target: "electron-renderer",
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: "[name]/index.css"
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      "@components": path.resolve(rendererDir, "./components"),
      "@containers": path.resolve(rendererDir, "./containers")
    }
  }
};
module.exports = config;
