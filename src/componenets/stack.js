import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const viewMemoryAt = (address, memory) => {
  const bytes = Array.from({ length: 8 }, (_, i) => {
    const v = memory.getUint8(address + i);
    return {
      address: address + i,
      value: `0x${v.toString(16).padStart(2, "0")}`
    };
  });
  return { blockStart: address.toString(16).padStart(4, "0"), bytes: bytes };
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    fontFamily: "Roboto Mono",
    minWidth: 450
  },
  byte: {
    marginLeft: theme.spacing(1)
  },
  stackPointer: {
    outline: "solid",
    outlineColor: theme.palette.sp,
    outlineWidth: 1
  },
  framePointer: {
    outline: "solid",
    outlineColor: theme.palette.fp,
    outlineWidth: 1
  },
  bothPointers: {
    outline: "solid",
    outlineColor: "white",
    outlineWidth: 1
  },
  h3: {
    margin: 0
  }
}));

function Stack({ memory, sp, fp, readwriteaddr, readOrWrite }) {
  const classes = useStyles();
  const [memoryBank, setMemoryBank] = useState(
    (0xffff - 0x00f0 + 0x0001) / 0x0008
  );

  const displayBytes = Array.from({ length: 0x00f0 / 0x0008 }, (_, i) => {
    const bytes = viewMemoryAt((i + memoryBank) * 0x0008, memory);
    const byteSpans = bytes.bytes.map(byte => (
      <span
        className={
          classes.byte +
          " " +
          (sp === byte.address
            ? fp === byte.address
              ? classes.bothPointers
              : classes.stackPointer
            : fp === byte.address
            ? classes.framePointer
            : "")
        }
        key={byte.address}
      >
        {byte.value === "0x00" ? "----" : byte.value}
      </span>
    ));
    return (
      <div className={bytes.blockStart} key={bytes.blockStart}>
        {bytes.blockStart}: {byteSpans}
      </div>
    );
  });

  return (
    <Paper className={classes.root}>
      <h3 className={classes.h3}>Stack Memory</h3>
      <div className={classes.controls}>
        <h3>
          Addresses: 0x
          {(memoryBank * 0x0008).toString(16).padStart(4, "0")} to 0x
          {(memoryBank * 0x0008 + 0x00f0 - 0x0001)
            .toString(16)
            .padStart(4, "0")}{" "}
          <ButtonGroup color="primary">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                if (memoryBank !== 0x0002) {
                  setMemoryBank(memoryBank - 0x00f0 / 0x0008);
                }
              }}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                if (memoryBank !== (0xffff - 0x00f0 + 0x0001) / 0x0008) {
                  setMemoryBank(memoryBank + 0x00f0 / 0x0008);
                }
              }}
            >
              Next
            </Button>
          </ButtonGroup>
        </h3>
      </div>
      {displayBytes}
    </Paper>
  );
}

export default Stack;
