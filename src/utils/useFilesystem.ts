import { useRef, useState } from "react";
import { IDirectory } from "../../types/files";
const { ipcRenderer } = window.require("electron");

ipcRenderer.on("open-file", (e: any, contents: any) => {
  console.log("test", contents);
});

export const useDirectory = (): [IDirectory, () => void] => {
  const openDirectory = () => {
    ipcRenderer.send("open-directory");
  };

  const [root, setRoot] = useState({} as IDirectory);
  ipcRenderer.on("open-directory", (e: any, contents: IDirectory) => {
    setRoot(contents);
    console.log(contents);
  });

  return [root, openDirectory];
};
