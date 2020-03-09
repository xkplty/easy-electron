"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = path.join(__dirname, "..");
const rendererDir = path.resolve(rootPath, "./src/renderer");
const templateDir = path.resolve(rootPath, "./webpack/template");
const entryPages = {
  main: path.resolve(rendererDir, "./pages/main/index.js")
};

exports.rendererDistDir = path.resolve(rootPath, "./dist");
exports.mainDir = path.resolve(rootPath, "./src/main");

exports.rootPath = rootPath;
exports.rendererDir = rendererDir;
exports.templateDir = templateDir;


exports.htmlPlugins = Object.keys(entryPages).map(
  v =>
    new HtmlWebpackPlugin({
      template: path.resolve(templateDir, "./index.html"),
      filename: `${v}/index.html`,
      chunks: [v]
    })
);
