import React from "react";
import { WithStyles, createStyles, withStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    line: {
      display: "flex",
      flexGrow: 1,
      fontFamily: "Roboto Mono",
    },
    byte: {
      flexGrow: 1,
    },
    byteHighlightIp: {
      flexGrow: 1,
      outlineColor: theme.palette.ip.main,
      outlineStyle: `solid`,
    },
    byteHighlightFp: {
      flexGrow: 1,
      outlineColor: theme.palette.fp.main,
      outlineStyle: `solid`,
    },
    byteHighlightSp: {
      flexGrow: 1,
      outlineColor: theme.palette.sp.main,
      outlineStyle: `solid`,
    },
    address: {
      display: "inline-flex",
      flexGrow: 0.2,
      backgroundColor: theme.palette.grey[800],
      justifyContent: "center",
      alignItems: "center",
    },
    byteContainer: {
      display: "inline-flex",
      flexGrow: 1,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    byteContainerB: {
      display: "inline-flex",
      flexGrow: 1,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.grey[500],
    },
  });

interface Props extends WithStyles<typeof styles> {
  ip?: number;
  sp?: number;
  fp?: number;
  address: number;
  bytes: string[];
}

export const MemoryLine = withStyles(styles)(
  ({ classes, address, bytes, ip, fp, sp }: Props) => {
    const byteSpans = bytes.map((byte, i) => {
      return (
        <span
          className={
            ip === address + i
              ? classes.byteHighlightIp
              : fp === address + i
              ? classes.byteHighlightFp
              : sp === address + i
              ? classes.byteHighlightSp
              : classes.byte
          }
        >
          {byte !== "0x00" ? byte : "----"}
        </span>
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
  },
);
