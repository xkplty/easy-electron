const path = require("path");
const { mainConfig } = require("../webpack.base");
const { mainDir, sourceDist } = require("../util");

module.exports = {
  entry: path.resolve(mainDir, "./index.js"),
  output: {
    path: sourceDist,
    filename: "index.js"
  },
  ...mainConfig
};
