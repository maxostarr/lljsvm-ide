import { ActionTypes } from "../types/fileEnums";
import { IDirectory } from "../types/files";
const { ipcRenderer } = window.require("electron");

ipcRenderer.on("open-file", (e: any, contents: any) => {
  console.log("test", contents);
});

export const useDirectory = (
  newRootCallback: (args: IDirectory) => void,
): [(path: string) => Promise<IDirectory>] => {
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

  return [getDirectory];
};
