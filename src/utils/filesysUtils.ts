import { ActionTypes } from "../types/fileEnums";
import { IDirectory } from "../types/files";
const { ipcRenderer } = window.require("electron");

type UseDirectoryReturn = [
  (path: string) => Promise<IDirectory>,
  (path: string) => void,
];

export const useDirectory = (
  newRootCallback: (args: IDirectory) => void,
): UseDirectoryReturn => {
  function getDirectory(path: string): Promise<IDirectory> {
    ipcRenderer.send(ActionTypes.OPEN_DIRECTORY, path);
    return new Promise((res, rej) => {
      ipcRenderer.on(
        ActionTypes.OPEN_DIRECTORY,
        (e: any, contents: IDirectory) => {
          res(contents);
        },
      );
    });
  }

  ipcRenderer.on(ActionTypes.NEW_ROOT, (e: any, contents: IDirectory) => {
    newRootCallback(contents);
  });

  const createDirectory = (path: string) => {
    ipcRenderer.send(ActionTypes.NEW_DIRECTORY, path);
  };

  return [getDirectory, createDirectory];
};

type UseFileReturn = [
  (path: string) => Promise<string>,
  (path: string) => void,
];

export const useFile = (): UseFileReturn => {
  const readFile = (path: string): Promise<string> => {
    ipcRenderer.send(ActionTypes.OPEN_FILE, path);
    return new Promise((res, rej) => {
      ipcRenderer.on(ActionTypes.OPEN_FILE, (e: any, contents: string) => {
        res(contents);
      });
    });
  };

  const createFile = (path: string) => {
    ipcRenderer.send(ActionTypes.NEW_FILE, path);
  };
  return [readFile, createFile];
};
