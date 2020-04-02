import React from "react";
import {
  Paper,
  Typography,
  Card,
  WithStyles,
  createStyles,
  withStyles,
  Theme
} from "@material-ui/core";
import Editor from "@monaco-editor/react";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    },
    title: {
      // height: "1fc"
      // width: "90%",
      padding: theme.spacing(1)
    },
    editorContainer: {
      // height: "100%",
      // width: "90%",
      flexGrow: 1
    }
  });

interface Props extends WithStyles<typeof styles> {}

export const EditorComponent = withStyles(styles)(({ classes }: Props) => {
  return (
    <div className={classes.container}>
      <Paper className={classes.title}>
        <Typography variant="h4">Editor</Typography>
      </Paper>
      <div className={classes.editorContainer}>
        <Editor language="javascript" />
      </div>
    </div>
  );
});
