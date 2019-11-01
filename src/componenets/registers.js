import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const registerNames = [
  "ip",
  "acc",
  "r1",
  "r2",
  "r3",
  "r4",
  "r5",
  "r6",
  "r7",
  "r8"
];

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  register: {
    fontFamily: "Roboto Mono"
  }
}));

function Registers({ cpu }) {
  const classes = useStyles();
  const registerDisplayElems = registerNames.map((name, index) => {
    return (
      <div key={index} className={classes.register}>
        {name.padEnd(3, " ")}:{" 0x"}
        {cpu
          .getRegister(name)
          .toString(16)
          .padStart(4, "0")}
      </div>
    );
  });
  return <Paper className={classes.root}>{registerDisplayElems}</Paper>;
}

export default Registers;
