import { app } from "electron";
import windowFactory from "./windowFactory";

let mainWindow = null;

app.commandLine.appendSwitch('no-sandbox');

const createMainWindow = () => {
  mainWindow = windowFactory.createWindow({
    name: "main",
    options: {}
  });
};

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (!mainWindow) {
    createMainWindow();
  }
});
