import React, { useContext, useEffect, useState } from "react";
import Decompiled from "./decompiled";
import { Paper, Button, TextField, makeStyles } from "@material-ui/core";
import { VMContext } from "../utils/vmContext";
import useInterval from "../utils/useInterval";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    MozAppearance: "textfield",
    WebkitAppearance: "none",
  },
}));

export const Run = () => {
  const classes = useStyles();
  const { stepCPU, setIsRunning, isRunning } = useContext(VMContext);
  const [runSpeed, setRunSpeed] = useState(500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRunSpeed(parseInt(event.target.value));
  };
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        stepCPU();
      }
    });

    return () => {
      window.removeEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          stepCPU();
        }
      });
      setIsRunning(false)
    };
  }, [stepCPU, setIsRunning]);

  useInterval(() => {
    if (isRunning) {
      stepCPU();
    }
  }, runSpeed);

  return (
    <div>
      <Paper>
        <Button
          color="secondary"
          variant="outlined"
          className={classes.button}
          onClick={(e) => {
            stepCPU();
          }}
        >
          Step
        </Button>
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="Run Delay (ms)"
          variant="outlined"
          value={runSpeed}
          type="number"
          onChange={handleChange}
        />
        <Button
          color="secondary"
          variant="outlined"
          className={classes.button}
          onClick={(e) => {
            setIsRunning(!isRunning);
          }}
        >
          {isRunning ? "Stop" : "Run"}
        </Button>
      </Paper>
      <Decompiled />
    </div>
  );
};
