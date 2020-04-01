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
      display: "flex"
    },
    byte: {},
    address: {
      display: "inline"
    },
    byteContainer: {
      display: "inline"
    }
  });

interface Props extends WithStyles<typeof styles> {
  address: number;
  bytes: string[];
}

export const MemoryLine = withStyles(styles)(
  ({ classes, address, bytes }: Props) => {
    const byteSpans = bytes.map(byte => {
      return <span className={classes.byte}></span>;
    });

    return (
      <div className={classes.line}>
        <div className={classes.address}>{address}</div>
        <div className={classes.byteContainer}>{byteSpans}</div>
      </div>
    );
  }
);
