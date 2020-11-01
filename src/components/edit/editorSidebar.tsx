import { makeStyles } from "@material-ui/core";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import React from "react";
import File from "./file";
import Folder from "./folder";

type FileType = {
  type: "file";
  name: string;
};

type FolderType = {
  type: "folder";
  name: string;
  contents: File[];
};

const dummyFilesystem = [
  {
    type: "folder",
    name: "ffffffffffffffffffffffffffffffff",
    contents: [
      { name: "file1.jsasm", type: "file" },
      { name: "file2.jsasm", type: "file" },
      { name: "file3.jsasm", type: "file" },
    ],
  } as FolderType,
] as (FileType | FolderType)[];

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    backgroundColor: theme.palette.grey[800],
  },
  item: {
    marginTop: "0.5em",
  },
}));

const EditorSidebar = () => {
  const classes = useStyles();

  const makeFile = (file: FileType) => (
    <File className={classes.item} name={file.name} />
  );
  const makeFolder = (folder: FolderType) => (
    <Folder
      className={classes.item}
      name={folder.name}
      contents={folder.contents}
    />
  );

  const filesAndFolders = dummyFilesystem.map((item) => {
    if (item.type === "folder") {
      return makeFolder(item);
    } else {
      return makeFile(item);
    }
  });

  return <div className={classes.container}>{filesAndFolders}</div>;
};

export default EditorSidebar;
