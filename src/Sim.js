import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";

import { VMContext } from "./utils/vm-context";

import Memory from "./components/memory";
import Registers from "./components/registers";
import Stack from "./components/stack";
import Code from "./components/code";
import TopBar from "./components/top-bar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 10
  }
}));

function App() {
  const classes = useStyles();
  const { stepCPU } = useContext(VMContext);

  useEffect(() => {
    window.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        stepCPU();
      }
    });

    return () => {
      window.removeEventListener("keydown", e => {
        if (e.key === "Enter") {
          stepCPU();
        }
      });
    };
  }, [stepCPU]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <Grid item xs={4}>
          <Memory />
        </Grid>
        <Grid item xs={1}>
          <Registers />
        </Grid>
        <Grid item xs={4}>
          <Stack />
        </Grid>
        <Grid item xs={1}>
          <Code />
        </Grid>
        <Grid item xs={12}>
          <p>
            By Max Starr. Based on the{" "}
            <Link href="https://github.com/LowLevelJavaScript/16-Bit-Virtual-Machine">
              lljsvm project
            </Link>
            . The repo for this project can be found{" "}
            <Link href="https://github.com/manmon42/lljsvm-ide">here</Link>
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
