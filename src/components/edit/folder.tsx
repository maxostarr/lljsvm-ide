import { makeStyles } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import React, { useState } from "react";
import { DirorFile, IFile } from "../../../types/files";
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
  contents: DirorFile[];
  className: string;
}

const Folder = ({ name, contents, className }: PropTypes) => {
  const [isOpen, setisOpen] = useState(true);
  const classes = useStyles();
  const files = contents?.map((file, i) => (
    <File
      className={className}
      name={file.name}
      key={`${i}${name}:${file.name}`}
    />
  ));
  return (
    <div className={`${className}`}>
      <div
        className={classes.nameContainer}
        onClick={(e) => {
          e.preventDefault();
          setisOpen(!isOpen);
        }}
      >
        {isOpen ? <FolderOpenIcon /> : <FolderIcon />}
        <div className={classes.name}>{name}</div>
      </div>
      <div className={classes.files}>{isOpen && files}</div>
    </div>
  );
};

export default Folder;
