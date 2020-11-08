import { makeStyles } from "@material-ui/core";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import React, { useContext } from "react";
import { IDirectory, IFile } from "../../types/files";
import { EditorContext } from "../../utils/editorContext";
import File from "./file";
import Folder from "./folder";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "calc(100vh - 5em)",
    backgroundColor: theme.palette.grey[800],
    padding: "1.5em",
    overflowY: "auto",
    overflowX: "hidden",
  },
  item: {
    marginTop: "0.5em",
  },
}));

const EditorSidebar = () => {
  const classes = useStyles();
  const { root } = useContext(EditorContext);

  const makeFile = (file: IFile, i: number) => (
    <File className={classes.item} name={file.name} key={`${i}${file.name}`} />
  );
  const makeFolder = (folder: IDirectory, i: number) => (
    <Folder
      key={`${i}${folder.name}`}
      className={classes.item}
      name={folder.name}
      path={folder.path}
      isOpen={folder.isOpen}
      contents={folder.contents}
    />
  );

  const filesAndFolders = root.contents
    ?.sort((a, _) => (a.isDirectory ? -1 : 1))
    .map((item, i) => {
      if (item.isDirectory) {
        return makeFolder(item, i);
      } else {
        return makeFile(item, i);
      }
    });
  return <div className={classes.container}>{filesAndFolders}</div>;
};

export default EditorSidebar;
