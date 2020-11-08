import { promises } from "fs";
import { parse } from "path";
import { IDirectory, IFilesystemComponent } from "../../src/types/files";

const { dialog } = require("electron");

const openDirectoryDaialog = async () => {
  return await dialog.showOpenDialog({ properties: ["openDirectory"] });
};
const openFileDaialog = async () => {
  return await dialog.showOpenDialog({ properties: ["openFile"] });
};

export const getDirectoryContents = async (path: string) => {
  const dir = await promises.opendir(path);
  const contents = [];
  for await (const dirent of dir) {
    if (dirent.name[0] !== ".")
      contents.push({
        name: dirent.name,
        path: `${path}\\${dirent.name}`,
        isDirectory: dirent.isDirectory(),
        isFile: dirent.isFile(),
      } as IFilesystemComponent);
  }
  console.log(contents);

  return contents;
};

export const getDirectory = async (path: string) => {
  const contents = await getDirectoryContents(path);
  return {
    name: parse(path).name,
    path,
    isDirectory: true,
    isFile: false,
    isOpen: true,
    contents,
  } as IDirectory;
};

export const openDirectory = async () => {
  const res = await openDirectoryDaialog();
  if (res.canceled === true || res.filePaths.length !== 1) {
    return;
  }
  return await getDirectory(res.filePaths[0]);
};
