import React, { useContext } from "react";
import registerNames from "../lljsvm/registers";
import {
  Paper,
  Typography,
  Card,
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core";
import { VMContext } from "../utils/vmContext";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    title: {
      // height: "1fc"
      padding: theme.spacing(1),
    },
    ip: { color: theme.palette.ip.main },
    fp: { color: theme.palette.fp.main },
    sp: { color: theme.palette.sp.main },
    registers: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey[600],
      display: "grid",
      padding: theme.spacing(3),
    },
    registerLine: {
      fontSize: theme.typography.fontSize * 1.5,
      fontFamily: "Roboto Mono",
    },
  });

interface Props extends WithStyles<typeof styles> {}

export const Registers = withStyles(styles)(({ classes }: Props) => {
  const { cpu } = useContext(VMContext);
  const registers = registerNames.map((name: string) => {
    return (
      <div
        className={`${classes.registerLine} ${
          name === "ip" ? classes.ip : ""
        } ${name === "fp" ? classes.fp : ""} ${
          name === "sp" ? classes.sp : ""
        }`}
      >
        {name.padEnd(4, "\u00a0")}: 0x
        {cpu.getRegister(name).toString(16).padStart(4, "0")}
      </div>
    );
  });

  return (
    <div className={classes.container}>
      <Paper className={classes.title}>
        <Typography variant="h4">Registers</Typography>
      </Paper>
      <Card className={classes.registers}>{registers}</Card>
    </div>
  );
});
