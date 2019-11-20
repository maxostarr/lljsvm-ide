import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import useInterval from "./utils/useInterval";
import { VMContext } from "./utils/vm-context";

import Memory from "./componenets/memory";
import Registers from "./componenets/registers";
import Stack from "./componenets/stack";
import Code from "./componenets/code";
import { cpu, memory } from "./lljsvm/index";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 10
  },
  button: {
    margin: theme.spacing(1)
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

  // const [memoryState, setMemoryState] = useState(memory);
  // const [step, setStep] = useState(0);
  // const [ip, setIp] = useState(cpu.getRegister("ip"));
  // const [sp, setSp] = useState(cpu.getRegister("sp"));
  // const [fp, setFp] = useState(cpu.getRegister("fp"));
  // const [runSpeed, setRunSpeed] = useState(1000);
  // const [isRunning, setIsRunning] = useState(false);

  // const handleChange = event => {
  //   setRunSpeed(event.target.value);
  // };

  // useInterval(() => {
  //   if (isRunning) {
  //     stepCPU();
  //   }
  // }, runSpeed);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="outlined"
                className={classes.button}
                onClick={e => {
                  vm.stepCPU();
                }}
              >
                Step
              </Button>
            </Grid>
            {/* <Grid item xs={2}>
              <TextField
                id="outlined-basic"
                className={classes.textField}
                label="Run Speed"
                variant="outlined"
                value={runSpeed}
                onChange={handleChange}
              />
              <Button
                color="secondary"
                variant="outlined"
                className={classes.button}
                onClick={e => {
                  setIsRunning(!isRunning);
                }}
              >
                {isRunning ? "Stop" : "Run"}
              </Button>
            </Grid> */}
          </Grid>
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
