const path = require("path");
const { mainConfig } = require("../webpack.base");
const { mainDir, rendererDistDir } = require("../util");

module.exports = {
  entry: path.resolve(mainDir, "./index.js"),
  output: {
    path: rendererDistDir,
    filename: "index.js"
  },
  ...mainConfig
};
