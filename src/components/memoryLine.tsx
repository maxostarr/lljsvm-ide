import React from "react";
import {
  Typography,
  Card,
  WithStyles,
  createStyles,
  withStyles,
  Theme
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    line: {
      display: "flex",
      flexGrow: 1,
      fontFamily: "Roboto Mono"
    },
    byte: {
      flexGrow: 1
    },
    address: {
      display: "inline-flex",
      flexGrow: 0.2,
      backgroundColor: theme.palette.grey[800],
      justifyContent: "center",
      alignItems: "center"
    },
    byteContainer: {
      display: "inline-flex",
      flexGrow: 1,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center"
    },
    byteContainerB: {
      display: "inline-flex",
      flexGrow: 1,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.grey[500]
    }
  });

interface Props extends WithStyles<typeof styles> {
  address: number;
  bytes: string[];
}

export const MemoryLine = withStyles(styles)(
  ({ classes, address, bytes }: Props) => {
    const byteSpans = bytes.map((byte, i) => {
      return (
        <span className={classes.byte}>{byte != "0x00" ? byte : "----"}</span>
      );
    });

    return (
      <div className={classes.line}>
        <div className={classes.address}>
          {address.toString(16).padStart(4, "0")}
        </div>
        <div
          className={
            address % 16 === 0 ? classes.byteContainer : classes.byteContainerB
          }
        >
          {byteSpans}
        </div>
      </div>
    );
  }
);
