import { makeStyles } from "@material-ui/core";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import React, { useContext } from "react";
import { IDirectory, IFile } from "../../../types/files";
import { EditorContext } from "../../utils/editorContext";
import File from "./file";
import Folder from "./folder";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    backgroundColor: theme.palette.grey[800],
    padding: "1.5em",
  },
  item: {
    marginTop: "0.5em",
  },
}));

const EditorSidebar = () => {
  const classes = useStyles();
  const { root } = useContext(EditorContext);
  console.log("from sidebar", root);

  const makeFile = (file: IFile, i: number) => (
    <File className={classes.item} name={file.name} key={`${i}${file.name}`} />
  );
  const makeFolder = (folder: IDirectory, i: number) => (
    <Folder
      key={`${i}${folder.name}`}
      className={classes.item}
      name={folder.name}
      contents={folder.contents}
    />
  );

  const filesAndFolders = root.contents
    ?.sort((a, b) => (a.isDirectory ? -1 : 1))
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
