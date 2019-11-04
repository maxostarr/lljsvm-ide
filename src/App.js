import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import Memory from "./componenets/memory";
import Registers from "./componenets/registers";
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
  const [readWriteAddr, setReadWriteAddr] = useState();
  const [readOrWrite, setReadOrWrite] = useState();
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
        <Grid item xs={1}>
          <h3>Step: {step}</h3>
        </Grid>
        <Grid item xs={11}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={e => {
              cpu.step();
              setMemoryState(memory);
              setStep(step + 1);
              setIp(cpu.getRegister("ip"));
            }}
          >
            Step
          </Button>
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
      </Grid>
    </div>
  );
}

export default App;
