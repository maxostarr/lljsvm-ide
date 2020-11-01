import classes from "*.module.css";
import { makeStyles } from "@material-ui/core";
import React from "react";
import File from "./file";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1.5em",
  },
}));

interface PropTypes {
  name: string;
  contents: File[];
}

const Folder = ({ name, contents }: PropTypes) => {
  const classes = useStyles();
  const files = contents.map((file) => (
    <File name={file.name} key={`${name}:${file}`} />
  ));
  return (
    <div className={classes.container}>
      {">"}
      {name}
      {files}
    </div>
  );
};

export default Folder;
