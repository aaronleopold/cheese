import { platform } from 'os';
import { Menu } from 'electron';
import { mb } from '.';
import open from 'open';

const VERSION = require('../../package.json').version;

export function addContextmenu() {
  if (!mb) return;

  let template = [
    {
      label: `About Cheese v${VERSION}`,
      click: () => open('https://www.github.com/aaronleopold/cheese'),
    },
    { type: 'separator' },
    {
      label: 'Platform: ' + platform,
    },
    {
      label: 'Toggle Dev Tools',
      click: () => mb?.window?.webContents.openDevTools(),
    },
    { type: 'separator' },

    { label: 'Quit', role: 'quit' },
  ];

  mb.tray.on('right-click', function () {
    const contextMenu = Menu.buildFromTemplate(template as any);
    Menu.setApplicationMenu(contextMenu);
    mb.tray.popUpContextMenu(contextMenu);
  });
}
