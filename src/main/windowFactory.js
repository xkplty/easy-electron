import { BrowserWindow } from "electron";
import path from 'path';

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
    const currentWindow = this.getWindow(name);
    if (currentWindow) {
      currentWindow.show();
      return;
    }

    const window = new BrowserWindow({ ...basicOptions, ...options });
    window.on("close", () => {
      WindowFactory.winndowsMap[name] = null;
    });

    window.once("ready-to-show", () => {
      window.show();
    });

    window.loadFile(path.join(__dirname, `${name}/index.html`));
    WindowFactory.winndowsMap[name] = window;
    
    return window;
  }

  getWindow(name) {
    return WindowFactory.winndowsMap[name];
  }

  closeWindow(name) {
    const currentWindow = this.getWindow(name);
    if (currentWindow) {
      currentWindow.close();
    }
  }

  sendMessage(targetName, data) {
    const currentWindow = this.getWindow(targetName);
    if (currentWindow && data) {
      currentWindow.webContents.send(data);
    }
  }
}

export default new WindowFactory();
