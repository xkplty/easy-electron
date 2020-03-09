const childProcess = require("child_process");
const electron = require("electron");
const webpack = require("webpack");
const configRenderer = require("../webpack/renderer");
const configMain = require("../webpack/main/webpack.config");

const env = "development";
const compilerMain = webpack(configMain);
const compilerRenderer = webpack(configRenderer(env));

compilerMain.run((err, stats) => {
  console.log(stats.toString({
    chunks: false,
    colors: true
  }));
  if (err && stats.hasErrors()) {
    console.log('webpack get Error when compile Main');
    return;
  }
  compilerRenderer.run((error, statses) => {
    console.log(statses.toString({
      chunks: false,
      colors: true
    }));
    if (error && statses.hasErrors()) {
      console.log('webpack get Error when compile Renderer');
      return;
    }
    childProcess
    .spawn(electron, ["."], { stdio: "inherit" })
    .on("close", () => {
      console.log('process ended');
    });
  });
});
