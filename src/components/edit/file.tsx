import React from "react";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { makeStyles } from "@material-ui/core";
interface PropTypes {
  name: string;
  className: string;
}

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

const File = ({ name, className }: PropTypes) => {
  const classes = useStyles();
  return (
    <div className={`${className} ${classes.nameContainer}`}>
      <InsertDriveFileIcon />
      <div className={classes.name}>{name}</div>
    </div>
  );
};

export default File;
