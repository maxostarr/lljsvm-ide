import React, { ReactChildren, ReactElement, useReducer } from "react";
import { Action, ActionTypes } from "../types/fileEnums";
import { DirOrFile, IDirectory } from "../types/files";
import { useDirectory } from "./useFilesystem";

export const EditorContext = React.createContext({} as IContextValue);

const reducer = (state: IDirectory, action: Action): IDirectory => {
  switch (action.type) {
    case ActionTypes.OPEN_DIRECTORY:
      const contents = action.payload as IDirectory;
      const updatedRootContents = state.contents.map((item) => {
        if (item.path === contents.path) {
          return contents;
        }
        return item;
      }) as DirOrFile[];
      return {
        ...state,
        contents: updatedRootContents,
      };
    case ActionTypes.CLOSE_DIRECTORY:
      const path = action.payload as string;
      const rootClosedDir = state.contents.map((item) => {
        if (item.path === path) {
          return {
            ...item,
            isOpen: false,
          };
        }
        return item;
      }) as DirOrFile[];
      return {
        ...state,
        contents: rootClosedDir,
      };
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
