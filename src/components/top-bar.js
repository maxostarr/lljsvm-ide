import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import useInterval from "../utils/useInterval";
import { VMContext } from "../utils/vm-context";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export default () => {
  const classes = useStyles();
  const { stepCPU, setIsRunning, isRunning } = useContext(VMContext);
  const [runSpeed, setRunSpeed] = useState(500);

  const handleChange = event => {
    setRunSpeed(event.target.value);
  };

  useInterval(() => {
    if (isRunning) {
      stepCPU();
    }
  }, runSpeed);

  return (
    <Grid container>
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
          label="Run Delay (ms)"
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
  );
};
