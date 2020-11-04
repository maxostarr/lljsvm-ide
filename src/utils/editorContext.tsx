import React, { ReactChildren, ReactElement } from "react";
import { IDirectory } from "../../types/files";
import { useDirectory } from "./useFilesystem";

interface IContextValue {
  root: IDirectory;
  openDirectory: () => void;
}

export const EditorContext = React.createContext({} as IContextValue);

interface PropTypes {
  children: ReactElement;
}

export const EditorContextProvider = ({ children }: PropTypes) => {
  const [root, openDirectory] = useDirectory();

  return (
    <EditorContext.Provider value={{ root, openDirectory }}>
      {children}
    </EditorContext.Provider>
  );
};
