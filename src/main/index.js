import { app } from 'electron';
import windowFactory from './windowFactory';

let main = null;

const createMainWindow = () => {
    main = windowFactory.createWindow({
        name: 'main',
        options: {},
    })
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (!main) {
        createMainWindow();
    }
});
