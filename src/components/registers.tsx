import React from "react";
import {
  Paper,
  Typography,
  Card,
  WithStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core";
import { cpu } from "../lljsvm/episode-10/index";

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
    registers: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey[600],
      display: "grid",
      padding: theme.spacing(3),
    },
    registerLine: {
      fontSize: theme.typography.fontSize * 2,
      fontFamily: "Roboto Mono",
    },
  });

interface Props extends WithStyles<typeof styles> {}

export const Registers = withStyles(styles)(({ classes }: Props) => {
  const registers = cpu.registerNames.map((name) => {
    return (
      <div className={classes.registerLine}>
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
