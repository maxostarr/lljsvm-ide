import React, { useContext } from "react";
import {
  Paper,
  Typography,
  Button,
  ButtonGroup,
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core";
import Editor from "@monaco-editor/react";
import Example from "./exampleCode";
import initLanguageConfig from "./monacoConfig";
import { VMContext } from "../../utils/vmContext";

initLanguageConfig();

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
      display: "flex",
      justifyContent: "space-between",
      paddingRight: theme.spacing(2),
    },
  });

interface Props extends WithStyles<typeof styles> {}

export const EditorComponent = withStyles(styles)(({ classes }: Props) => {
  const { initVM } = useContext(VMContext);
  const compileCode = () => {
    initVM([12, 34, 56, 78]);
    // test();
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.title}>
        <Typography variant="h4">Editor</Typography>
        <Button variant="contained" color="secondary" onClick={compileCode}>
          Compile
        </Button>
      </Paper>
      <Editor theme="lljsasm" language="lljsasm" value={Example} />
    </div>
  );
});
