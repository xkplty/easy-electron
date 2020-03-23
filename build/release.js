const childProcess = require("child_process");
const electron = require("electron");
const { build } = require('electron-builder');
const webpack = require("webpack");
const configRenderer = require("../webpack/renderer");
const configMain = require("../webpack/main/webpack.config");
const { version } = require('../package');

const env = "production";
const compilerMain = webpack(configMain);
const compilerRenderer = webpack(configRenderer(env));


const publish = 'never';
const appPackageName = 'Lili';
const appName = 'Lili';

const config = {
  appId: 'Lili',
  productName: 'Lili',
  mac: {
    artifactName: appPackageName + '-${version}.${ext}'
  },
  mas: {
    artifactName: appPackageName + '-${version}-mas.${ext}'
  },
  nsis: {
    artifactName: appPackageName + '-setup-${version}.${ext}'
  },
  appx: {
    displayName: appName,
    publisherDisplayName: appName,
    artifactName: appPackageName + '-${version}-${arch}.${ext}'
  },
};


const releaseDarwin = function (cb = () => {}) {
  build({
    publish,
    x64: true,
    mac: [],
    config
  })
    .then(() => cb())
    .catch(error => cb(error));
};

const releaseWin32 = function (cb = () => {}) {
  build({
    publish,
    x64: true,
    win: ['nsis'],
    config
  })
    .then(() => cb())
    .catch(error => cb(error));
};

const releaseLinux = function (cb = () => {}) {
  build({
    publish,
    x64: true,
    linux: [],
    c: { productName: 'Kim' },
    config
  }).then(
    () => cb(),
    error => cb(error)
  );
};

const releaseAPP = function (cb = () => {}) {
  const { platform } = process;
  if (platform === 'darwin') {
    releaseDarwin(cb);
  } else if (platform === 'win32') {
    releaseWin32(cb);
  } else if (platform === 'linux') {
    releaseLinux(cb);
  } else {
    cb(new Error('no platform found'));
  }
};

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
    releaseAPP();
  });
});
