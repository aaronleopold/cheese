import { app, ipcMain } from 'electron';
import is from 'electron-is';
import { menubar, Menubar } from 'menubar';
import path from 'path';
import url from 'url';

import { addContextmenu } from './menu';
import createOpenHandler from './utils/createOpenHandler';
import getDefaultWindowSize from './utils/getDefaultWindowSize';

// dependabot
delete require('electron').nativeImage.createThumbnailFromPath;

export let mainWindow: Electron.BrowserWindow;
export let mb: Menubar;

app.commandLine.appendSwitch('ignore-certificate-errors');

app.on('ready', () => {
  mb = menubar({
    index: is.dev()
      ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
      : url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true,
        }),
    // icon: path.join(__dirname, '..', 'assets/icons/png/16x16.png'),
    // @ts-ignore: __static will be injected
    icon: path.join(__static, 'icons/png/16x16.png'),
    tooltip: 'Cheese',
    browserWindow: {
      ...getDefaultWindowSize(),
      resizable: is.dev(),
      webPreferences: {
        nodeIntegration: true,
      },
      alwaysOnTop: is.dev(),
    },
    showDockIcon: false,
  });

  mb.on('after-create-window', () => {
    if (is.dev()) {
      mb.window?.webContents.openDevTools({ mode: 'undocked' });
    }

    if (mb.window) {
      mainWindow = mb.window;
      // https://github.com/maxogden/menubar/issues/306
      // also see package.json @ mac
      app.dock?.hide();
    }

    addContextmenu();
  });
});

app.on('web-contents-created', createOpenHandler);

app.on('window-all-closed', (event: Event) => {
  app.dock.hide();
  event.preventDefault();
});

ipcMain.on('resize_event', (_, { width, height }: any) => {
  mb.window?.setSize(width, height, true);
});
