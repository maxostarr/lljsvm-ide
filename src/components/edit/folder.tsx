import { makeStyles } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import React, { useContext, useState } from "react";
import { DirOrFile, IDirectory, IFile } from "../../types/files";
import { EditorContext } from "../../utils/editorContext";
import File from "./file";

const useStyles = makeStyles((theme) => ({
  nameContainer: {
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
  },
  name: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  files: {
    paddingLeft: "1em",
    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
    borderLeftColor: theme.palette.grey[500],
  },
}));

interface PropTypes {
  name: string;
  path: string;
  contents: DirOrFile[];
  isOpen: boolean;
  className: string;
}

const Folder = ({ name, path, contents, isOpen, className }: PropTypes) => {
  const { openDirectory, closeDirectory } = useContext(EditorContext);
  const classes = useStyles();

  const makeFile = (file: IFile, i: number) => (
    <File
      className={className}
      name={file.name}
      path={file.path}
      key={`${i}${file.name}`}
    />
  );
  const makeFolder = (folder: IDirectory, i: number) => (
    <Folder
      key={`${i}${folder.name}`}
      className={className}
      name={folder.name}
      path={folder.path}
      isOpen={folder.isOpen}
      contents={folder.contents}
    />
  );

  const filesAndFolders = contents
    ?.sort((a, _) => (a.isDirectory ? -1 : 1))
    .map((item, i) => {
      if (item.isDirectory) {
        return makeFolder(item, i);
      } else {
        return makeFile(item, i);
      }
    });

  return (
    <div className={`${className}`}>
      <div
        className={classes.nameContainer}
        onClick={(e) => {
          e.preventDefault();
          if (!isOpen) {
            openDirectory(path);
          } else {
            closeDirectory(path);
          }
        }}
      >
        {isOpen ? <FolderOpenIcon /> : <FolderIcon />}
        <div className={classes.name}>{name}</div>
      </div>
      <div className={classes.files}>{isOpen && filesAndFolders}</div>
    </div>
  );
};

export default Folder;
