import React from "react";
import {
  Paper,
  Typography,
  Card,
  WithStyles,
  createStyles,
  withStyles,
  Theme
} from "@material-ui/core";
import { cpu } from "../16-Bit-Virtual-Machine/episode-6/index";
import { MemoryLine } from "./memoryLine";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100%"
    },
    title: {
      padding: theme.spacing(1)
    },
    memory: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey[600]
    }
  });

interface Props extends WithStyles<typeof styles> {}

export const Memory = withStyles(styles)(({ classes }: Props) => {
  const memoryLines = Array.from({ length: 16 }, (_, i) => {
    return <MemoryLine address={i * 8} bytes={cpu.viewMemoryAt(i * 8, 8)} />;
  });

  return (
    <div className={classes.container}>
      <Paper className={classes.title}>
        <Typography variant="h4">Memory</Typography>
      </Paper>
      <Card className={classes.memory}>{memoryLines}</Card>
    </div>
  );
});
