import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItemConstructorOptions,
} from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import {
  getDirectory,
  getDirectoryContents,
  openDirectory,
} from "./utils/files";

import { ActionTypes } from "../src/types/fileEnums";

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    // frame: false,
  });

  if (isDev) {
    win.loadURL("http://localhost:3000/");
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  win.on("closed", () => (win = null));

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron",
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });
  }

  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  if (isDev) {
    win.webContents.openDevTools();
  }
}

const handleNewRoot = async () => {
  openDirectory().then((contents) => {
    win?.webContents.send(ActionTypes.NEW_ROOT, contents);
  });
};

const handleOpenDirectory = (e: any, path: string) => {
  getDirectory(path).then((directory) => {
    win?.webContents.send(ActionTypes.OPEN_DIRECTORY, directory);
  });
};
ipcMain.on(ActionTypes.OPEN_DIRECTORY, handleOpenDirectory);

const template = [
  {
    label: "File",
    submenu: [
      {
        label: "Open File",
        accelerator: "CommandOrControl+o",
        click: handleNewRoot,
      },
      {
        label: "Open Folder",
        accelerator: "CommandOrControl+Shift+o",
      },
    ],
  },
  {
    label: "Edit",
    submenu: [
      {
        role: "undo",
      },
      {
        role: "redo",
      },
      {
        type: "separator",
      },
      {
        role: "cut",
      },
      {
        role: "copy",
      },
      {
        role: "paste",
      },
    ],
  },

  {
    label: "View",
    submenu: [
      {
        role: "reload",
      },
      {
        role: "toggledevtools",
      },
      {
        type: "separator",
      },
      {
        role: "resetzoom",
      },
      {
        role: "zoomin",
      },
      {
        role: "zoomout",
      },
      {
        type: "separator",
      },
      {
        role: "togglefullscreen",
      },
    ],
  },

  {
    role: "window",
    submenu: [
      {
        role: "minimize",
      },
      {
        role: "close",
      },
    ],
  },

  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
      },
    ],
  },
] as MenuItemConstructorOptions[];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});