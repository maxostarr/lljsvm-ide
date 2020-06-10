import React, { useContext, useState } from "react";
import {
  Paper,
  Button,
  WithStyles,
  createStyles,
  withStyles,
  Theme,
  Tabs,
  Tab,
} from "@material-ui/core";
import Editor from "@monaco-editor/react";
import Example from "./exampleCode";
import initLanguageConfig from "./monacoConfig";
import { VMContext } from "../../utils/vmContext";
import Decompiled from "./decompiled";

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
      // height: theme.spacing(8),
      // width: "90%",
      padding: theme.spacing(0.73),
      display: "flex",
      justifyContent: "space-between",
      paddingRight: theme.spacing(2),
    },
    tab: {
      backgroundColor: theme.palette.primary.light,
      selected: {
        backgroundColor: theme.palette.secondary.light,
      },
    },
  });

interface Props extends WithStyles<typeof styles> {}

export const EditorComponent = withStyles(styles)(({ classes }: Props) => {
  const [state, setState] = useState(0);

  const { initVM } = useContext(VMContext);

  const compileCode = () => {
    initVM([12, 34, 56, 78]);
  };

  const handleChange = (event: any, newValue: any) => {
    setState(newValue);
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.title}>
        <Tabs
          value={state}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab className={classes.tab} label="Editor" />
          <Tab className={classes.tab} label="Decompiled" />
        </Tabs>
        <Button variant="contained" color="secondary" onClick={compileCode}>
          Compile
        </Button>
      </Paper>
      {state === 0 ? (
        <Editor theme="lljsasm" language="lljsasm" value={Example} />
      ) : (
        <Decompiled />
      )}
    </div>
  );
});
