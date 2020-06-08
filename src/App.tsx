import React from "react";
import {
  CssBaseline,
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core";
import { Screen, Registers, Editor, Stack, Memory } from "./components/index";
import VMContextProvider from "./utils/vmContext";
const styles = (theme: Theme) =>
  createStyles({
    containter: {
      height: "100vh",
      display: "grid",
      gridTemplateColumns: "20vw 50vw 30vw",
      gridTemplateRows: "repeat(6, 1fr)",
      overflow: "hidden",
      gridTemplateAreas:
        "'screen editor memory'  'screen editor memory' 'registers editor memory' 'registers editor stack' 'registers editor stack' 'registers editor stack'",
    },
    screen: {
      gridArea: "screen",
      height: "100%",
    },
    registers: {
      gridArea: "registers",
      height: "100%",
    },
    editor: {
      gridArea: "editor",
      height: "100%",
    },
    memory: {
      gridArea: "memory",
      height: "100%",
    },
    stack: {
      gridArea: "stack",
      height: "100%",
    },
  });

interface Props extends WithStyles<typeof styles> {}

const App = withStyles(styles)(({ classes }: Props) => {
  return (
    <VMContextProvider>
      <CssBaseline />
      <div className={classes.containter}>
        <div className={classes.screen}>
          <Screen />
        </div>
        <div className={classes.registers}>
          <Registers />
        </div>
        <div className={classes.editor}>
          <Editor />
        </div>
        <div className={classes.memory}>
          <Memory />
        </div>
        <div className={classes.stack}>
          <Stack />
        </div>
      </div>
    </VMContextProvider>
  );
});

export default App;
