import { makeStyles } from "@material-ui/core";
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
    name: "folder1",
    contents: [
      { name: "file1.jsasm", type: "file" },
      { name: "file2.jsasm", type: "file" },
      { name: "file3.jsasm", type: "file" },
    ],
  } as FolderType,
] as (FileType | FolderType)[];

const makeFile = (file: FileType) => <File name={file.name} />;
const makeFolder = (folder: FolderType) => (
  <Folder name={folder.name} contents={folder.contents} />
);

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    backgroundColor: theme.palette.grey[800],
  },
}));

const EditorSidebar = () => {
  const classes = useStyles();

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
