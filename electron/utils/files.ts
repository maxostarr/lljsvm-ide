import { promises } from "fs";
import { IDirectory, IFilesystemComponent } from "../../types/files";

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
        isDirectory: dirent.isDirectory(),
        isFile: dirent.isFile(),
      } as IFilesystemComponent);
  }
  return contents;
};

export const openDirectory = async () => {
  const res = await openDirectoryDaialog();
  if (res.canceled === true || res.filePaths.length !== 1) {
    return;
  }
  const contents = await getDirectoryContents(res.filePaths[0]);
  return {
    name: res.filePaths[0],
    isDirectory: true,
    isFile: false,
    isOpen: true,
    contents,
  } as IDirectory;
};
