import { makeStyles, Box, Divider } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import React, { useState } from "react";
import File from "./file";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1.5em",
  },
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
  contents: File[];
  className: string;
}

const Folder = ({ name, contents, className }: PropTypes) => {
  const [isOpen, setisOpen] = useState(true);
  const classes = useStyles();
  const files = contents.map((file) => (
    <File className={className} name={file.name} key={`${name}:${file}`} />
  ));
  return (
    <div className={`${className} ${classes.container}`}>
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
