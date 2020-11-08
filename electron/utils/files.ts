import { promises } from "fs";
import { parse } from "path";
import { IDirectory, IFilesystemComponent } from "../../src/types/files";

const { dialog } = require("electron");

const openDirectoryDialog = async () => {
  return await dialog.showOpenDialog({ properties: ["openDirectory"] });
};

const openFileDialog = async () => {
  return await dialog.showOpenDialog({ properties: ["openFile"] });
};

const newDirectoryDialog = async () => {
  return await dialog.showSaveDialog({ properties: ["createDirectory"] });
};

const newFileDialog = async () => {
  return await dialog.showSaveDialog({});
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

  return contents;
};

export const getFileContents = async (path: string) => {
  return (await promises.readFile(path)).toString();
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
  const res = await openDirectoryDialog();
  if (res.canceled === true || res.filePaths.length !== 1) {
    return;
  }
  return await getDirectory(res.filePaths[0]);
};

export const createNewFile = async (rootPath: string) => {
  const path = (await newFileDialog()).filePath;
  console.log(path);

  if (path) {
    await promises.writeFile(path, "");
  }
  return await getDirectory(rootPath);
};

export const createNewDirectory = async (rootPath: string) => {
  const path = await newDirectoryDialog();
  console.log(path);

  return await getDirectory(rootPath);
};
