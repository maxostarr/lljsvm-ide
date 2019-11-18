import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import useInterval from "./utils/useInterval";

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
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function App() {
  const classes = useStyles();

  const [memoryState, setMemoryState] = useState(memory);
  const [step, setStep] = useState(0);
  const [ip, setIp] = useState(cpu.getRegister("ip"));
  const [sp, setSp] = useState(cpu.getRegister("sp"));
  const [fp, setFp] = useState(cpu.getRegister("fp"));
  const [readWriteAddr, setReadWriteAddr] = useState();
  const [readOrWrite, setReadOrWrite] = useState();
  const [runSpeed, setRunSpeed] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);

  const handleChange = event => {
    setRunSpeed(event.target.value);
  };

  const stepCPU = () => {
    cpu.step();
    setMemoryState(memory);
    setStep(step + 1);
    setIp(cpu.getRegister("ip"));
    setSp(cpu.getRegister("sp"));
    setFp(cpu.getRegister("fp"));
  };

  useInterval(() => {
    if (isRunning) {
      stepCPU();
    }
  }, runSpeed);

  const instructionCallback = (instr, addr) => {
    console.log(instr, addr);
    if (instr === "MOV_MEM_REG") {
      setReadOrWrite("read");
    } else if (instr === "MOV_REG_MEM") {
      setReadOrWrite("write");
    } else {
      setReadOrWrite("");
    }
    setReadWriteAddr(addr);
  };

  cpu.setInstructionCallback(instructionCallback);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            onKeyPress={e => {
              if (e.key === "Enter") {
                stepCPU();
              }
            }}
            tabIndex={-1}
          >
            <Grid item xs={1}>
              <h3>Step: {step}</h3>
            </Grid>
            <Grid item xs={1}>
              <Button
                color="primary"
                variant="outlined"
                className={classes.button}
                onClick={e => {
                  stepCPU();
                }}
              >
                Step
              </Button>
            </Grid>
            <Grid item xs={2}>
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Memory
            memory={memoryState}
            ip={ip}
            readwriteaddr={readWriteAddr}
            readOrWrite={readOrWrite}
          />
        </Grid>
        <Grid item xs={1}>
          <Registers cpu={cpu} />
        </Grid>
        <Grid item xs={3}>
          <Stack memory={memoryState} sp={sp} fp={fp} />
        </Grid>
        <Grid item xs={1}>
          <Code memory={memoryState} ip={ip} setIsRunning={setIsRunning} />
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
