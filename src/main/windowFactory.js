import { BrowserWindow } from "electron";

const basicOptions = {
  width: 800,
  height: 600,
  minWidth: 800,
  minHeight: 600,
  titleBarStyle: "hidden",
  backgroundColor: "#FFF",
  show: false
};

class WindowFactory {
  static winndowsMap = {};

  createWindow(config = {}) {
    const { name, options } = config;
    if (WindowFactory.winndowsMap[name]) {
      WindowFactory.winndowsMap[name].show();
      return;
    }

    const window = new BrowserWindow({ ...basicOptions, ...options });
    window.on("close", () => {
      window = null;
    });

    window.once("ready-to-show", () => {
      window.show();
    });

    const url = `file://${__dirname}/dist/${name}/index.html`;
    window.loadURL(url);
    WindowFactory.winndowsMap[name] = window;
    
    return WindowFactory.winndowsMap[name];
  }

  getWindow(name) {
    return WindowFactory.winndowsMap[name];
  }

  closeWindow(name) {
    if (WindowFactory.winndowsMap[name]) {
      WindowFactory.winndowsMap[name].close();
    }
  }

  sendMessage(targetName, data) {
    if (WindowFactory.winndowsMap[targetName] && data) {
      WindowFactory.winndowsMap[targetName].webContents.send(data);
    }
  }
}

export default new WindowFactory();
