import React, { ReactChildren, ReactElement, useReducer } from "react";
import { Action, ActionTypes } from "../types/fileEnums";
import { DirOrFile, IDirectory } from "../types/files";
import { useDirectory } from "./useFilesystem";

export const EditorContext = React.createContext({} as IContextValue);

const updateDirectoryContents = (
  root: IDirectory,
  newDirectory: IDirectory,
): IDirectory => {
  const newContents = root.contents.map((item) => {
    if (item.isDirectory === false) {
      return item;
    }
    item = item as IDirectory;
    if (newDirectory.path === item.path) {
      return newDirectory;
    }
    if (newDirectory.path.includes(item.path)) {
      return updateDirectoryContents(item, newDirectory);
    }
    return item;
  });
  return {
    ...root,
    contents: newContents,
  };
};

const updateCloseDirectory = (root: IDirectory, path: string): IDirectory => {
  const newContents = root.contents.map((item) => {
    if (item.isDirectory === false) {
      return item;
    }
    item = item as IDirectory;
    if (path === item.path) {
      return {
        ...item,
        isOpen: false,
      };
    }
    if (path.includes(item.path)) {
      return updateCloseDirectory(item, path);
    }
    return item;
  });
  return {
    ...root,
    contents: newContents,
  };
};

const reducer = (root: IDirectory, action: Action): IDirectory => {
  switch (action.type) {
    case ActionTypes.OPEN_DIRECTORY:
      const contents = action.payload as IDirectory;
      const updatedRoot = updateDirectoryContents(root, contents);
      return updatedRoot;
    case ActionTypes.CLOSE_DIRECTORY:
      const path = action.payload as string;
      return updateCloseDirectory(root, path);
    case ActionTypes.NEW_ROOT:
      return action.payload as IDirectory;
    default:
      return {} as IDirectory;
  }
};

interface IContextValue {
  root: IDirectory;
  openDirectory: (path: string) => void;
  closeDirectory: (path: string) => void;
}

interface PropTypes {
  children: ReactElement;
}

export const EditorContextProvider = ({ children }: PropTypes) => {
  const [root, dispatch] = useReducer(reducer, {} as IDirectory);

  const [getDirectory] = useDirectory((payload) =>
    dispatch({ type: ActionTypes.NEW_ROOT, payload }),
  );

  const closeDirectory = (path: string) =>
    dispatch({ type: ActionTypes.CLOSE_DIRECTORY, payload: path });

  const openDirectory = async (path: string) => {
    console.log(path);

    const dir = await getDirectory(path);
    dispatch({
      type: ActionTypes.OPEN_DIRECTORY,
      payload: dir,
    });
  };
  return (
    <EditorContext.Provider value={{ root, openDirectory, closeDirectory }}>
      {children}
    </EditorContext.Provider>
  );
};
