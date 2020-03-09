const { mainConfig } = require("../webpack.base");

module.exports = {
  entry: path.resolve(mainDir, "./index.js"),
  output: {
    path: rendererDistDir,
    filename: "index.js"
  },
  ...mainConfig
};
