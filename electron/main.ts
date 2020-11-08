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
  createNewDirectory,
  createNewFile,
  getDirectory,
  getDirectoryContents,
  getFileContents,
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
  openDirectory().then((root) => {
    win?.webContents.send(ActionTypes.NEW_ROOT, root);
  });
};

const handleOpenDirectory = (e: any, path: string) => {
  getDirectory(path).then((directory) => {
    win?.webContents.send(ActionTypes.OPEN_DIRECTORY, directory);
  });
};

const handleOpenFile = (e: any, path: string) => {
  getFileContents(path).then((fileContents) => {
    win?.webContents.send(ActionTypes.OPEN_FILE, fileContents);
  });
};

const handleNewFile = (e: any, path: string) => {
  createNewFile(path).then((root) => {
    win?.webContents.send(ActionTypes.NEW_ROOT, root);
  });
};

const handleNewDirectory = (e: any, path: string) => {
  createNewDirectory(path).then((root) => {
    win?.webContents.send(ActionTypes.NEW_ROOT, root);
  });
};

ipcMain.on(ActionTypes.OPEN_DIRECTORY, handleOpenDirectory);
ipcMain.on(ActionTypes.OPEN_FILE, handleOpenFile);
ipcMain.on(ActionTypes.NEW_FILE, handleNewFile);
ipcMain.on(ActionTypes.NEW_DIRECTORY, handleNewDirectory);

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
