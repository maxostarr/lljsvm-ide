import React from "react";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { EditorContext } from "../../utils/editorContext";
interface PropTypes {
  name: string;
  path: string;
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

const File: React.FunctionComponent<PropTypes> = ({
  name,
  path,
  className,
}: PropTypes) => {
  const classes = useStyles();
  const { openFile } = useContext(EditorContext);
  return (
    <div
      className={`${className} ${classes.nameContainer}`}
      onClick={() => openFile(path)}
    >
      <InsertDriveFileIcon />
      <div className={classes.name}>{name}</div>
    </div>
  );
};

export default File;
