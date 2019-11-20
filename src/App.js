import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";

import useInterval from "./utils/useInterval";
import { VMContext } from "./utils/vm-context";

import Memory from "./componenets/memory";
import Registers from "./componenets/registers";
import Stack from "./componenets/stack";
import Code from "./componenets/code";
import TopBar from "./componenets/top-bar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 10
  }
}));

function App() {
  const classes = useStyles();
  const vm = useContext(VMContext);

  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        vm.stepCPU();
      }
    });

    return () => {
      document.removeEventListener("keydown", e => {
        if (e.key === "Enter") {
          vm.stepCPU();
        }
      });
    };
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <Grid item xs={3}>
          <Memory />
        </Grid>
        <Grid item xs={1}>
          <Registers />
        </Grid>
        <Grid item xs={3}>
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
