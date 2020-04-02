import React from "react";
import {
  Paper,
  Typography,
  Card,
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core";
import Editor from "@monaco-editor/react";
import Example from "./exampleCode";

import { monaco } from "@monaco-editor/react";
import { lljsasmDefs } from "./monarchDef";
monaco
  .init()
  .then(monacoInstance => {
    monacoInstance.languages.register({ id: "lljsasm" });
    monacoInstance.languages.setMonarchTokensProvider("lljsasm", lljsasmDefs);
  })
  .catch(console.log);

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    title: {
      // height: "1fc"
      // width: "90%",
      padding: theme.spacing(1),
    },
  });

interface Props extends WithStyles<typeof styles> {}

export const EditorComponent = withStyles(styles)(({ classes }: Props) => {
  return (
    <div className={classes.container}>
      <Paper className={classes.title}>
        <Typography variant="h4">Editor</Typography>
      </Paper>
      <Editor theme="dark" language="lljsasm" value={Example} />
    </div>
  );
});
