import React, { useContext, useState, useRef } from "react";
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

import { VMContext } from "../utils/vmContext";
import { EditorComponent } from "./editor/editor";
import { Run } from "./run";

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

export const MainPannelComponent = withStyles(styles)(({ classes }: Props) => {
  const [state, setState] = useState(0);
  const valueGetter = useRef((): string => {
    return "";
  });

  const { initVM } = useContext(VMContext);

  const assembleCode = () => {
    var code = null;
    if (valueGetter) {
      code = valueGetter?.current();
      console.log(code);
    }
    if (code) {
      initVM(code);
    }
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
          <Tab className={classes.tab} label="Run" />
        </Tabs>
        <Button variant="contained" color="secondary" onClick={assembleCode}>
          Assemble
        </Button>
      </Paper>
      {state === 0 ? <EditorComponent valueGetter={valueGetter} /> : <Run />}
    </div>
  );
});
